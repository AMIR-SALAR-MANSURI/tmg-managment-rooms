/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from "framer-motion";
import {
  File as FileIcon,
  FileText,
  Image as ImageIcon,
  Loader2,
  Music,
  Trash,
  UploadCloud,
  Video,
} from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { FileItem, FileUploadProps, FileUploadState } from "./file-upload";
import {
  createImagePreview,
  fileToBase64,
  formatFileSize,
  validateFileType,
} from "./file-upload.util";
// import Image from 'next/image'

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  accept,
  maxSize,
  maxLen,
  onChange,
  value,
  baseUrl,
  disabled = false,
  sendAsFile = false,
  getFileByUuid,
  className = "",
  onError,
  placeholder = "برای انتخاب فایل کلیک کنید یا آن را به اینجا بکشید",
  error,
  name,
  id,
}) => {
  const [state, setState] = useState<FileUploadState>({
    files: [],
    isDragging: false,
    isLoading: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  // Initialize files from value prop
  useEffect(() => {
    function isFile(value: unknown): value is File {
      return value instanceof File;
    }

    const initializeFiles = async () => {
      if (!value) {
        setState((prev) => ({ ...prev, files: [] }));
        return;
      }

      const values = Array.isArray(value) ? value : [value];
      const newFiles: FileItem[] = [];
      const promises: Promise<void>[] = [];

      for (const val of values) {
        if (typeof val === "string") {
          if (val.startsWith("data:")) {
            // Base64 string - منطق فعلی + ساخت File
            const type =
              val.split(";")[0].split(":")[1] || "application/octet-stream";
            const byteString = atob(val.split(",")[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type });
            const file = new File([blob], "Uploaded file", { type });

            const fileItem: FileItem = {
              id: crypto.randomUUID(),
              file,
              base64: val,
              name: "Uploaded file",
              size: file.size,
              type,
              createdAt: Date.now(),
              preview: val.startsWith("data:image/") ? val : undefined,
            };
            newFiles.push(fileItem);
          } else if (baseUrl || getFileByUuid) {
            // UUID - fetch from baseUrl
            const fetchPromise = (async () => {
              try {
                setState((prev) => ({ ...prev, isLoading: true }));
                let blob: Blob;

                if (getFileByUuid) {
                  const result = await getFileByUuid(val);
                  blob =
                    result instanceof File
                      ? new Blob([await result.arrayBuffer()], {
                          type: result.type,
                        })
                      : result;
                } else {
                  const response = await fetch(`${baseUrl}/${val}`);
                  blob = await response.blob();
                }
                const file = new File([blob], val, { type: blob.type });

                const fileItem: FileItem = {
                  id: val,
                  file,
                  uuid: val,
                  name: val,
                  size: file.size,
                  type: file.type,
                  createdAt: Date.now(),
                  preview: file.type.startsWith("image/")
                    ? URL.createObjectURL(blob)
                    : undefined,
                };
                newFiles.push(fileItem);
              } catch (error) {
                console.error("Failed to fetch file:", error);
              } finally {
                setState((prev) => ({ ...prev, isLoading: false }));
              }
            })();
            promises.push(fetchPromise);
          }
        } else if (isFile(val)) {
          const f = val as File;

          const fileItem: FileItem = {
            id: crypto.randomUUID(),
            file: val,
            createdAt: Date.now(),
            name: f.name,
            size: f.size,
            type: f.type,
          };

          // برای سازگاری، base64 و preview تولید کن (async)
          const processPromise = (async () => {
            try {
              setState((prev) => ({ ...prev, isLoading: true }));
              const base64 = await fileToBase64(val);
              fileItem.base64 = base64;

              if (f.type.startsWith("image/")) {
                fileItem.preview = await createImagePreview(val);
              }
            } catch (error) {
              fileItem.error = "Failed to process file";
            } finally {
              setState((prev) => ({ ...prev, isLoading: false }));
            }
          })();
          promises.push(processPromise);
          newFiles.push(fileItem);
        }
      }

      await Promise.all(promises);

      setState((prev) => ({ ...prev, files: newFiles }));
    };

    initializeFiles();
  }, [value, baseUrl, getFileByUuid]);

  const handleFileProcessing = async (files: FileList) => {
    const newFiles: FileItem[] = [];

    Array.from(files).map(async (file) => {
      // Validate file type
      if (!validateFileType(file, accept)) {
        return onError?.({ type: "type", wrongType: file.type });
      }

      // Validate file size
      if (maxSize && file.size > maxSize) {
        return onError?.({ type: "maxSize", wrongSize: file.size });
      }

      // validation file len
      if (maxLen && files.length > maxLen) {
        return onError?.({ type: "maxLen", wrongLen: maxLen });
      }

      const fileItem: FileItem = {
        id: crypto.randomUUID(),
        file,
        createdAt: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        isUploading: true,
      };

      newFiles.push(fileItem);

      // Process file (convert to base64 and create preview if image)
      try {
        const base64 = await fileToBase64(file);

        fileItem.base64 = base64;

        if (file.type.startsWith("image/")) {
          fileItem.preview = await createImagePreview(file);
        }

        fileItem.isUploading = false;
      } catch (error) {
        fileItem.error = "Failed to process file";
        fileItem.isUploading = false;
      }
    });

    console.log(newFiles);

    return newFiles;
  };

  const handleFilesSelected = async (files: FileList) => {
    const processedFiles = await handleFileProcessing(files);

    setState((prev) => {
      const updatedFiles = multiple
        ? [...prev.files, ...processedFiles]
        : processedFiles;

      if (onChange) {
        let output: any;
        if (sendAsFile) {
          output = multiple
            ? updatedFiles.map((f) => f.file).filter(Boolean)
            : updatedFiles[0]?.file || null;
        } else {
          output = multiple
            ? updatedFiles.map((f) => f.base64 || f.uuid || "").filter(Boolean)
            : updatedFiles[0]?.base64 || updatedFiles[0]?.uuid || "";
        }
        onChange(output as any);
      }

      return { ...prev, files: updatedFiles };
    });
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setState((prev) => ({ ...prev, isDragging: true }));
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;

    if (dragCounter.current === 0) {
      setState((prev) => ({ ...prev, isDragging: false }));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current = 0;
    setState((prev) => ({ ...prev, isDragging: false }));

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFilesSelected(files);
    }
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (files && files.length > 0) {
        handleFilesSelected(files);
      }
      e.target.value = "";
    },
    []
  );

  const removeFile = useCallback(
    (fileId: string) => {
      setState((prev) => {
        const updatedFiles = prev.files.filter((f) => f.id !== fileId);

        if (onChange) {
          let output: any;
          if (sendAsFile) {
            output = multiple
              ? updatedFiles.map((f) => f.file).filter(Boolean)
              : updatedFiles[0]?.file || null;
          } else {
            output = multiple
              ? updatedFiles
                  .map((f) => f.base64 || f.uuid || "")
                  .filter(Boolean)
              : updatedFiles[0]?.base64 || updatedFiles[0]?.uuid || "";
          }
          onChange(output as any);
        }

        return { ...prev, files: updatedFiles };
      });
    },
    [multiple, onChange, sendAsFile]
  );

  const handleClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  const renderFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-5 h-5" />;
    if (type.startsWith("video/")) return <Video className="w-5 h-5" />;
    if (type.startsWith("audio/")) return <Music className="w-5 h-5" />;
    if (type.includes("pdf") || type.includes("text"))
      return <FileText className="w-5 h-5" />;
    return <FileIcon className="w-5 h-5" />;
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-3 transition-all duration-200 cursor-pointer
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${
            state.isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${error ? "border-red-500" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInputChange}
          disabled={disabled}
          className="hidden"
          id={id}
          name={name}
        />

        <div className="flex items-center justify-start gap-2 p-1">
          <UploadCloud className="!size-6 text-gray-400" />
          <p className="text-sm text-gray-600 text-center">{placeholder}</p>
          {accept && (
            <p dir="ltr" className="text-xs text-gray-500 flex-grow">
              {accept}
            </p>
          )}
          {maxSize && (
            <p dir="rtl" className="text-xs text-gray-500">
              Max: {formatFileSize(maxSize)}
            </p>
          )}
        </div>

        {state.isDragging && (
          <div className="absolute inset-0 bg-blue-100 bg-opacity-50 rounded-lg flex items-center justify-center">
            <p className="text-blue-600 font-medium">Drop files here</p>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <AnimatePresence mode="wait">
        <div className="mt-4 space-y-2">
          {state.files.length > 0 &&
            state.files.map((file, index) => (
              <motion.div
                key={file.name + file.size}
                layout
                initial={{ opacity: 0, y: -20, transition: { duration: 1 } }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.3,
                    duration: 1,
                  },
                }}
                exit={{ opacity: 0, y: 20, transition: { duration: 5 } }}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  {file.preview ? (
                    <Image
                      width={100}
                      height={100}
                      alt={file.name}
                      src={file.preview}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      {renderFileIcon(file.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p dir="rtl" className="text-xs text-gray-500">
                      {`${file.type} • ${formatFileSize(file.size)}`}
                    </p>
                    {file.error && (
                      <p className="text-xs text-red-500 mt-1">{file.error}</p>
                    )}
                  </div>

                  {file.isUploading && (
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  )}

                  <Button
                    variant="ghost"
                    className="!p-0 !size-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    disabled={disabled}
                  >
                    <Trash className="text-destructive" />
                  </Button>
                </div>
              </motion.div>
            ))}
        </div>
      </AnimatePresence>

      {state.isLoading && (
        <div className="mt-4 flex items-center justify-center p-4 bg-gray-50 rounded-lg">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin mr-2" />
          <p className="text-sm text-gray-600">Loading files...</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
