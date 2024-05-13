// components/FilePicker.tsx
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FilePicker: React.FC<{
  name: string;
  value: any;
  placeholder: string;
  onChange: (file: File | null) => void;
  errorMessage?: string;
}> = ({ name, placeholder, onChange, errorMessage }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
    setSelectedFile(file);
  };

  let bgColor = !!errorMessage ? "bg-red-100" : "bg-gray-100";
  let textColor = !!errorMessage ? "text-red-500" : "text-gray-500";

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center space-x-4">
        <label
          htmlFor="file-upload"
          className={`cursor-pointer ${bgColor} px-4 py-2 rounded-lg flex items-center space-x-2`}
        >
          <FontAwesomeIcon icon={faUpload} className={textColor} />
          <span className={textColor}>{placeholder}</span>
        </label>
        <input
          name={name}
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {selectedFile && <span className={textColor}>{selectedFile.name}</span>}
      </div>
      {errorMessage && (
        <span className="text-xs text-red-400">{errorMessage}</span>
      )}
    </div>
  );
};

export default FilePicker;
