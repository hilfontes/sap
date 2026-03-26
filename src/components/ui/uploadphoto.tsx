"use client";

import { useState } from "react";

export function UploadPhoto({ userId, currentPhoto }: any) {
  const [preview, setPreview] = useState(currentPhoto);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: any) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`http://localhost:3001/users/${userId}/photo`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setPreview(`http://localhost:3001/api/${data.photo}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-900">
        <img
          src={preview || "/avatar-placeholder.png"}
          className="w-full h-full object-cover"
        />
      </div>

      <input type="file" onChange={handleChange} />

      <button
        onClick={handleUpload}
        className="bg-blue-900 text-white px-3 py-1 rounded"
      >
        Upload
      </button>
    </div>
  );
}
