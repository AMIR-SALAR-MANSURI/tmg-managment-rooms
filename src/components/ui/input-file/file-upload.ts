type OnErrorProps =
  | { type: "maxSize"; wrongSize: number }
  | { type: "maxLen"; wrongLen: number }
  | { type: "type"; wrongType: string };

export interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  onChange?: (files: File[] | string[]) => void;
  getFileByUuid?: (uuid: string) => Promise<Blob | File>;
  value?: string | string[];
  baseUrl?: string;
  sendAsFile?: boolean;
  disabled?: boolean;
  className?: string;
  maxLen?: number;
  onError?: (props: OnErrorProps) => void;
  placeholder?: string;
  error?: string;
  name?: string;
  id?: string;
}

export interface FileItem {
  id: string;
  createdAt: number;
  file?: File;
  base64?: string;
  uuid?: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
  isUploading?: boolean;
  error?: string;
}

export interface FileUploadState {
  files: FileItem[];
  isDragging: boolean;
  isLoading: boolean;
}
