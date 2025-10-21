/**
 * FileUpload - Drag and drop file upload component
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns - Built on native file input
 * - Principle 2: Borders before shadows - Clean 2px borders with dashed style
 * - Principle 3: Typography before decoration - Font weight for hierarchy
 * - Principle 4: Tokens before magic numbers - All spacing from design tokens
 * - Principle 5: Composition before complexity - Simple file input with drag-drop
 * - Principle 6: Standards before frameworks - Native File API
 * - Principle 7: Accessibility before aesthetics - Full keyboard navigation
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <FileUpload
 *   onChange={(files) => console.log(files)}
 *   label="Upload documents"
 *   accept=".pdf,.doc,.docx"
 *   multiple
 * />
 * ```
 */

import { FileText, Upload, X } from "@spexop/icons";
import type React from "react";
import { useId, useRef, useState } from "react";
import styles from "./FileUpload.module.css";
import type { FileUploadProps } from "./FileUpload.types.js";

export function FileUpload({
  onChange,
  label,
  disabled = false,
  required = false,
  error,
  helpText,
  size = "md",
  accept,
  multiple = false,
  maxSize,
  className,
  id: providedId,
  icon,
  showPreview = true,
  uploadText = "Click to upload",
  dragText = "or drag and drop",
  onDrop,
  files: controlledFiles,
  onRemoveFile,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = providedId || autoId;

  const files = controlledFiles || internalFiles;

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  // Validate file size
  const validateFileSize = (file: File): boolean => {
    if (!maxSize) return true;
    return file.size <= maxSize;
  };

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    // Validate file sizes
    if (maxSize) {
      const invalidFiles = Array.from(fileList).filter(
        (file) => !validateFileSize(file),
      );
      if (invalidFiles.length > 0) {
        alert(
          `Some files exceed the maximum size of ${formatFileSize(maxSize)}`,
        );
        return;
      }
    }

    if (!controlledFiles) {
      setInternalFiles(Array.from(fileList));
    }
    onChange(fileList);
  };

  // Handle drag events
  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const fileList = event.dataTransfer.files;
    if (!fileList || fileList.length === 0) return;

    // Validate file sizes
    if (maxSize) {
      const invalidFiles = Array.from(fileList).filter(
        (file) => !validateFileSize(file),
      );
      if (invalidFiles.length > 0) {
        alert(
          `Some files exceed the maximum size of ${formatFileSize(maxSize)}`,
        );
        return;
      }
    }

    if (!controlledFiles) {
      setInternalFiles(Array.from(fileList));
    }

    onChange(fileList);
    if (onDrop) {
      onDrop(fileList);
    }
  };

  // Handle click on upload area
  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  // Remove file
  const handleRemoveFile = (index: number) => {
    if (onRemoveFile) {
      onRemoveFile(index);
    } else {
      const newFiles = files.filter((_, i) => i !== index);
      setInternalFiles(newFiles);

      // Create new FileList-like object for onChange
      const dataTransfer = new DataTransfer();
      for (const file of newFiles) {
        dataTransfer.items.add(file);
      }
      onChange(dataTransfer.files);
    }
  };

  const inputVariant = error ? "error" : "default";

  return (
    <div className={`${styles.fileUpload} ${className || ""}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <div
        className={`${styles.uploadArea} ${styles[`size-${size}`]} ${
          isDragging ? styles.dragging : ""
        } ${disabled ? styles.disabled : ""} ${
          inputVariant === "error" ? styles.hasError : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label || "Upload files"}
        aria-disabled={disabled}
      >
        <input
          ref={inputRef}
          type="file"
          id={inputId}
          className={styles.input}
          onChange={handleFileChange}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          required={required}
          aria-label={label}
          aria-invalid={error ? "true" : undefined}
        />

        <div className={styles.uploadContent}>
          {icon || (
            <Upload
              className={styles.uploadIcon}
              size={48}
              strokeWidth={1.5}
              color="currentColor"
            />
          )}
          <div className={styles.uploadText}>
            <span className={styles.uploadTextPrimary}>{uploadText}</span>
            <span className={styles.uploadTextSecondary}>{dragText}</span>
          </div>
          {accept && (
            <div className={styles.acceptText}>Accepted: {accept}</div>
          )}
          {maxSize && (
            <div className={styles.maxSizeText}>
              Max size: {formatFileSize(maxSize)}
            </div>
          )}
        </div>
      </div>

      {showPreview && files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                <FileText
                  className={styles.fileIcon}
                  size={20}
                  strokeWidth={2}
                  color="currentColor"
                />
                <div className={styles.fileDetails}>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileSize}>
                    {formatFileSize(file.size)}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                aria-label={`Remove ${file.name}`}
              >
                <X size={16} strokeWidth={2} color="currentColor" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}

      {helpText && !error && <div className={styles.helpText}>{helpText}</div>}
    </div>
  );
}
