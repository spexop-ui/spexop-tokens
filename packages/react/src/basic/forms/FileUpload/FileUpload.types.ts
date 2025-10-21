import type { ReactNode } from "react";

export interface FileUploadProps {
  /**
   * Change handler with File or FileList
   */
  onChange: (files: FileList | null) => void;

  /**
   * Label for the file upload
   */
  label?: string;

  /**
   * Whether the file upload is disabled
   */
  disabled?: boolean;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Help text to display below the file upload
   */
  helpText?: string;

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Accept specific file types (e.g., "image/*", ".pdf,.doc")
   */
  accept?: string;

  /**
   * Allow multiple file selection
   */
  multiple?: boolean;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the file upload element
   */
  id?: string;

  /**
   * Custom icon for upload area
   */
  icon?: ReactNode;

  /**
   * Show file list preview
   */
  showPreview?: boolean;

  /**
   * Custom text for upload area
   */
  uploadText?: string;

  /**
   * Custom text for drag area
   */
  dragText?: string;

  /**
   * Callback when files are dropped
   */
  onDrop?: (files: FileList) => void;

  /**
   * Current files (for controlled component)
   */
  files?: File[];

  /**
   * Remove file handler (for controlled component)
   */
  onRemoveFile?: (index: number) => void;
}
