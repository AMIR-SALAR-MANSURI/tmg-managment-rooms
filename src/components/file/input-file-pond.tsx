// Import React FilePond
import { FilePond, FilePondProps, registerPlugin } from "react-filepond";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
// import { convertToBase64 } from "@/libs/convertToBase64";
import { FilePondFile } from "filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

export default function InputFilePond({
  value,
  onChange,
  ...props
}: { value?: any; onChange?: (arg: any) => any } & FilePondProps) {
  const onAddFile = async (file: FilePondFile[]) => {
    const uploadStrategy =
      !props.allowFileEncode && !props.storeAsFile && !props.allowProcess;

    const addBase64Prefix = (base64String: any) => {
      return `${base64String}`;
    };

    if (!props.allowMultiple) {
      const currentFile = file?.[0];
      let submitFile = null;

      if (props.allowFileEncode) {
        const base64String = await currentFile.getFileEncodeBase64String();
        const mimeType = currentFile.fileType;
        // submitFile = {
        //   dapperRow: "",
        //   name: currentFile.file.name,
        //   content: addBase64Prefix(base64String),
        //   contentType: mimeType,
        // };
        submitFile = base64String;
      }
      if (props.storeAsFile || uploadStrategy) {
        submitFile = currentFile.file;
      }

      if (props.allowProcess) {
        submitFile = currentFile.serverId;
      }
      onChange?.(submitFile);
    }

    if (props.allowMultiple) {
      const promises = file.map(async (item) => {
        let submitFile = null;

        if (props.allowFileEncode) {
          const base64String = await item.getFileEncodeBase64String();
          const mimeType = item.fileType;
          submitFile = {
            name: item.file.name,
            content: addBase64Prefix(base64String),
            siffix: mimeType,
          };
        }

        if (props.storeAsFile || uploadStrategy) {
          submitFile = item.file;
        }

        if (props.allowProcess) {
          submitFile = item.serverId;
        }

        return submitFile;
      });

      const files = await Promise.all(promises);

      onChange?.(files);
    }
  };

  return (
    <span>
      <FilePond
        labelIdle='<div>فایل خود را بکش و رها کن یا <span class="filepond--label-action">جستجو کن</span></div>'
        onupdatefiles={(files) => onAddFile?.(files)}
        allowProcess={props.allowProcess || false}
        maxFileSize="50MB"
        labelMaxFileSizeExceeded="حجم فایل بیش از حد مجاز است"
        labelMaxFileSize={`حداکثر حجم مجاز فایل 50 مگابایت است`}
        server={
          props.allowProcess
            ? {
                url: `${process.env.NEXT_PUBLIC_API_URL}/api/uploads`,
                process: "/process",
                revert: { url: "/revert/", method: "GET" },
              }
            : null
        }
        {...props}
      />
    </span>
  );
}
