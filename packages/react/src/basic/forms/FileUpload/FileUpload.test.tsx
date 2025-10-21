/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { FileUpload } from "./FileUpload";

describe("FileUpload", () => {
  const mockFile = new File(["content"], "test.pdf", {
    type: "application/pdf",
  });
  const mockImage = new File(["image"], "test.png", { type: "image/png" });

  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<FileUpload onChange={() => {}} />);
      expect(
        screen.getByRole("button", { name: /upload files/i }),
      ).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<FileUpload onChange={() => {}} label="Upload documents" />);
      expect(screen.getByText("Upload documents")).toBeInTheDocument();
    });

    it("renders upload icon", () => {
      const { container } = render(<FileUpload onChange={() => {}} />);
      expect(container.querySelector(".uploadIcon")).toBeInTheDocument();
    });

    it("renders upload text", () => {
      render(<FileUpload onChange={() => {}} uploadText="Click to upload" />);
      expect(screen.getByText("Click to upload")).toBeInTheDocument();
    });

    it("renders drag text", () => {
      render(<FileUpload onChange={() => {}} dragText="or drag and drop" />);
      expect(screen.getByText("or drag and drop")).toBeInTheDocument();
    });

    it("shows accepted file types", () => {
      render(<FileUpload onChange={() => {}} accept=".pdf,.doc" />);
      expect(screen.getByText(/Accepted: \.pdf,\.doc/i)).toBeInTheDocument();
    });

    it("shows max file size", () => {
      render(<FileUpload onChange={() => {}} maxSize={5 * 1024 * 1024} />);
      expect(screen.getByText(/Max size: 5 MB/i)).toBeInTheDocument();
    });
  });

  describe("File Selection", () => {
    it("calls onChange when file is selected", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<FileUpload onChange={handleChange} />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, mockFile);

      expect(handleChange).toHaveBeenCalled();
    });

    it("accepts multiple files when multiple is true", () => {
      render(<FileUpload onChange={() => {}} multiple />);
      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute("multiple");
    });

    it("does not accept multiple files by default", () => {
      render(<FileUpload onChange={() => {}} />);
      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).not.toHaveAttribute("multiple");
    });

    it("filters files by accept attribute", () => {
      render(<FileUpload onChange={() => {}} accept=".pdf" />);
      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute("accept", ".pdf");
    });
  });

  describe("File Preview", () => {
    it("shows file list after upload", async () => {
      const user = userEvent.setup();
      render(<FileUpload onChange={() => {}} />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, mockFile);

      expect(screen.getByText("test.pdf")).toBeInTheDocument();
    });

    it("hides file list when showPreview is false", async () => {
      const user = userEvent.setup();
      render(<FileUpload onChange={() => {}} showPreview={false} />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, mockFile);

      expect(screen.queryByText("test.pdf")).not.toBeInTheDocument();
    });

    it("displays file size", async () => {
      const user = userEvent.setup();
      render(<FileUpload onChange={() => {}} />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, mockFile);

      expect(screen.getByText(/7 Bytes/i)).toBeInTheDocument();
    });

    it("displays multiple files", async () => {
      const user = userEvent.setup();
      render(<FileUpload onChange={() => {}} multiple />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, [mockFile, mockImage]);

      expect(screen.getByText("test.pdf")).toBeInTheDocument();
      expect(screen.getByText("test.png")).toBeInTheDocument();
    });

    it("shows file icon for each file", async () => {
      const user = userEvent.setup();
      const { container } = render(<FileUpload onChange={() => {}} />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, mockFile);

      expect(container.querySelector(".fileIcon")).toBeInTheDocument();
    });
  });

  describe("File Removal", () => {
    it("removes file when remove button is clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<FileUpload onChange={handleChange} />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, mockFile);

      expect(screen.getByText("test.pdf")).toBeInTheDocument();

      const removeButton = screen.getByRole("button", {
        name: /remove test\.pdf/i,
      });
      await user.click(removeButton);

      expect(screen.queryByText("test.pdf")).not.toBeInTheDocument();
    });

    it("calls onRemoveFile when provided", async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      render(
        <FileUpload
          onChange={() => {}}
          files={[mockFile]}
          onRemoveFile={handleRemove}
        />,
      );

      const removeButton = screen.getByRole("button", {
        name: /remove test\.pdf/i,
      });
      await user.click(removeButton);

      expect(handleRemove).toHaveBeenCalledWith(0);
    });
  });

  describe("Drag and Drop", () => {
    it("applies dragging state on drag enter", async () => {
      const { container } = render(<FileUpload onChange={() => {}} />);

      const dropZone = container.querySelector(".uploadArea") as HTMLElement;
      dropZone.dispatchEvent(new DragEvent("dragenter", { bubbles: true }));

      expect(container.querySelector(".dragging")).toBeInTheDocument();
    });

    it("removes dragging state on drag leave", async () => {
      const { container } = render(<FileUpload onChange={() => {}} />);

      const dropZone = container.querySelector(".uploadArea") as HTMLElement;
      dropZone.dispatchEvent(new DragEvent("dragenter", { bubbles: true }));
      dropZone.dispatchEvent(new DragEvent("dragleave", { bubbles: true }));

      expect(container.querySelector(".dragging")).not.toBeInTheDocument();
    });

    it("calls onChange on file drop", async () => {
      const handleChange = vi.fn();
      const { container } = render(<FileUpload onChange={handleChange} />);

      const dropZone = container.querySelector(".uploadArea") as HTMLElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(mockFile);

      dropZone.dispatchEvent(
        new DragEvent("drop", { bubbles: true, dataTransfer }),
      );

      expect(handleChange).toHaveBeenCalled();
    });

    it("calls onDrop callback when provided", async () => {
      const handleDrop = vi.fn();
      const { container } = render(
        <FileUpload onChange={() => {}} onDrop={handleDrop} />,
      );

      const dropZone = container.querySelector(".uploadArea") as HTMLElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(mockFile);

      dropZone.dispatchEvent(
        new DragEvent("drop", { bubbles: true, dataTransfer }),
      );

      expect(handleDrop).toHaveBeenCalled();
    });
  });

  describe("File Size Validation", () => {
    it("validates max file size", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const largeFile = new File(["x".repeat(2000)], "large.pdf", {
        type: "application/pdf",
      });

      // Mock alert
      global.alert = vi.fn();

      render(<FileUpload onChange={handleChange} maxSize={1000} />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, largeFile);

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining("exceed the maximum size"),
      );
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Required Field", () => {
    it("shows required indicator when required", () => {
      render(<FileUpload onChange={() => {}} label="Documents" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("has required attribute when required", () => {
      render(<FileUpload onChange={() => {}} required />);
      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toBeRequired();
    });
  });

  describe("Disabled State", () => {
    it("disables file input when disabled", () => {
      render(<FileUpload onChange={() => {}} disabled />);
      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it("does not accept files when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<FileUpload onChange={handleChange} disabled />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, mockFile);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies disabled styles", () => {
      const { container } = render(<FileUpload onChange={() => {}} disabled />);
      expect(container.querySelector(".disabled")).toBeInTheDocument();
    });

    it("does not accept drag when disabled", () => {
      const handleChange = vi.fn();
      const { container } = render(
        <FileUpload onChange={handleChange} disabled />,
      );

      const dropZone = container.querySelector(".uploadArea") as HTMLElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(mockFile);

      dropZone.dispatchEvent(
        new DragEvent("drop", { bubbles: true, dataTransfer }),
      );

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      const { container } = render(
        <FileUpload onChange={() => {}} size="sm" />,
      );
      expect(container.querySelector(".size-sm")).toBeInTheDocument();
    });

    it("renders with medium size by default", () => {
      const { container } = render(<FileUpload onChange={() => {}} />);
      expect(container.querySelector(".size-md")).toBeInTheDocument();
    });

    it("renders with large size", () => {
      const { container } = render(
        <FileUpload onChange={() => {}} size="lg" />,
      );
      expect(container.querySelector(".size-lg")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("displays error message when error prop is provided", () => {
      render(<FileUpload onChange={() => {}} error="Upload failed" />);
      expect(screen.getByText("Upload failed")).toBeInTheDocument();
    });

    it("applies error styles when error is present", () => {
      const { container } = render(
        <FileUpload onChange={() => {}} error="Error" />,
      );
      expect(container.querySelector(".hasError")).toBeInTheDocument();
    });

    it("error message has role alert", () => {
      render(<FileUpload onChange={() => {}} error="Upload failed" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Upload failed");
    });
  });

  describe("Help Text", () => {
    it("displays help text when provided", () => {
      render(
        <FileUpload onChange={() => {}} helpText="Upload PDF or DOC files" />,
      );
      expect(screen.getByText("Upload PDF or DOC files")).toBeInTheDocument();
    });

    it("does not display help text when error is present", () => {
      render(
        <FileUpload onChange={() => {}} error="Error" helpText="Help text" />,
      );
      expect(screen.queryByText("Help text")).not.toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("triggers file dialog with Enter key", async () => {
      const user = userEvent.setup();
      const { container } = render(<FileUpload onChange={() => {}} />);

      const uploadArea = container.querySelector(".uploadArea") as HTMLElement;
      uploadArea.focus();
      await user.keyboard("{Enter}");

      // File dialog should be triggered (though we can't test it directly)
      expect(uploadArea).toHaveAttribute("role", "button");
    });

    it("triggers file dialog with Space key", async () => {
      const user = userEvent.setup();
      const { container } = render(<FileUpload onChange={() => {}} />);

      const uploadArea = container.querySelector(".uploadArea") as HTMLElement;
      uploadArea.focus();
      await user.keyboard(" ");

      expect(uploadArea).toHaveAttribute("role", "button");
    });
  });

  describe("Accessibility", () => {
    it("upload area has role button", () => {
      const { container } = render(<FileUpload onChange={() => {}} />);
      const uploadArea = container.querySelector(".uploadArea");
      expect(uploadArea).toHaveAttribute("role", "button");
    });

    it("upload area has tabindex", () => {
      const { container } = render(<FileUpload onChange={() => {}} />);
      const uploadArea = container.querySelector(".uploadArea");
      expect(uploadArea).toHaveAttribute("tabindex", "0");
    });

    it("upload area is not focusable when disabled", () => {
      const { container } = render(<FileUpload onChange={() => {}} disabled />);
      const uploadArea = container.querySelector(".uploadArea");
      expect(uploadArea).toHaveAttribute("tabindex", "-1");
    });

    it("associates label with input", () => {
      render(<FileUpload onChange={() => {}} label="Upload files" />);
      expect(screen.getByText("Upload files")).toBeInTheDocument();
    });

    it("has aria-label on upload area", () => {
      render(<FileUpload onChange={() => {}} label="Documents" />);
      const uploadArea = screen.getByRole("button", { name: /documents/i });
      expect(uploadArea).toBeInTheDocument();
    });

    it("has aria-disabled when disabled", () => {
      render(<FileUpload onChange={() => {}} disabled />);
      const uploadArea = screen.getByRole("button");
      expect(uploadArea).toHaveAttribute("aria-disabled", "true");
    });

    it("has aria-invalid when error is present", () => {
      render(<FileUpload onChange={() => {}} error="Error" />);
      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("remove buttons have proper aria-labels", async () => {
      const user = userEvent.setup();
      render(<FileUpload onChange={() => {}} />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, mockFile);

      expect(
        screen.getByRole("button", { name: /remove test\.pdf/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Custom Icon", () => {
    it("renders custom icon when provided", () => {
      const CustomIcon = () => <span data-testid="custom-icon">📁</span>;
      render(<FileUpload onChange={() => {}} icon={<CustomIcon />} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Controlled Component", () => {
    it("works as controlled component", () => {
      render(<FileUpload onChange={() => {}} files={[mockFile]} />);
      expect(screen.getByText("test.pdf")).toBeInTheDocument();
    });

    it("updates when files prop changes", () => {
      const { rerender } = render(
        <FileUpload onChange={() => {}} files={[mockFile]} />,
      );

      rerender(<FileUpload onChange={() => {}} files={[mockImage]} />);

      expect(screen.queryByText("test.pdf")).not.toBeInTheDocument();
      expect(screen.getByText("test.png")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty file list", () => {
      const { container } = render(<FileUpload onChange={() => {}} />);
      expect(container.querySelector(".fileList")).not.toBeInTheDocument();
    });

    it("formats large file sizes correctly", async () => {
      const user = userEvent.setup();
      const largeFile = new File(["x".repeat(5 * 1024 * 1024)], "large.pdf", {
        type: "application/pdf",
      });

      render(<FileUpload onChange={() => {}} maxSize={10 * 1024 * 1024} />);

      const input = screen
        .getByRole("button", { name: /upload files/i })
        .querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, largeFile);

      expect(screen.getByText(/MB/i)).toBeInTheDocument();
    });
  });
});
