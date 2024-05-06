import { Field } from "formik";
import React, { useState } from "react";
import styled from "styled-components";

interface ImageUploaderProps {
  url?: string;
  name: string;
  label: string;
  accept: string;
  onChange?: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  name,
  label,
  accept,
  onChange,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // =======================================================================

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file && onChange) {
      onChange(file);
    }
    if (file) {
      setImage(file);
      let url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      <label htmlFor={name} className="text-lg font-semibold">
        {label}
      </label>
      {previewUrl && (
        <StyledImg src={previewUrl} alt="Preview" className="w-full h-32" />
      )}
      <Field
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleOnChange}
      />
    </div>
  );
};

const StyledImg = styled.img`
  object-fit: scale-down;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
`;
export default ImageUploader;
