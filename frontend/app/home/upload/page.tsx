"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { X, Upload, Folder, File, Trash2 } from "lucide-react";
import "./style.css"

interface FileWithPath extends File {
  path?: string;
  webkitRelativePath: string;
}

export default function MultiFileUpload() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(files));
  }, [files]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files) as FileWithPath[];
      newFiles.forEach((file) => {
        file.path = file.webkitRelativePath || file.name;
      });
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFiles([]);
    localStorage.removeItem("uploadedFiles");
  };

  const uploadFiles = async () => {
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file, file.path);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully");
        // Note: We're not clearing files after upload to keep them visible
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
      setProgress(100);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName?.split(".").pop()?.toLowerCase() || "";
    switch (extension) {
      case "pdf":
        return <File className="w-4 h-4 text-red-500" />;
      case "doc":
      case "docx":
        return <File className="w-4 h-4 text-blue-500" />;
      case "xls":
      case "xlsx":
        return <File className="w-4 h-4 text-green-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <File className="w-4 h-4 text-purple-500" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full  max-w-md mx-auto space-y-4 min-w-[80%] ">
      <div className="flex justify-center items-center space-x-2">
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          aria-label="Select files"
        />
        <Input
          type="file"
          ref={folderInputRef}
          onChange={handleFileChange}
          multiple
          webkitdirectory=""
          directory=""
          className="hidden"
          aria-label="Select folders"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Select Files</span>
        </Button>
        <Button
          onClick={() => folderInputRef.current?.click()}
          className="flex items-center space-x-2"
        >
          <Folder className="w-4 h-4" />
          <span>Select Folders</span>
        </Button>
        <Button
          onClick={uploadFiles}
          disabled={files.length === 0 || uploading}
          className="flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>{uploading ? "Uploading..." : "Upload"}</span>
        </Button>
        <Button
          onClick={clearFiles}
          variant="destructive"
          size="icon"
          aria-label="Clear all files"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      {files.length > 0 && (
        <div className="border rounded-md p-4 space-y-2 scrollbar-container overflow-y-auto max-h-[82vh]">
          <h3 className="font-semibold">Selected Files:</h3>
          <ul className="space-y-1">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate flex-1 flex items-center space-x-2">
                  {getFileIcon(file.name)}
                  <span>{file.path || file.name}</span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {uploading && <Progress value={progress} className="w-full" />}
    </div>
  );
}
