"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

export function UploadPhoto({ userId, currentPhoto }: any) {
  const [photo, setPhoto] = useState(currentPhoto);
  const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  useEffect(() => {
    setPhoto(currentPhoto);
  }, [currentPhoto]);

  async function updateUserPhoto(urlCompleto: string) {
    await fetch(`${API_URL}/api/auth/updateuserphoto/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photo: urlCompleto }),
    });
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 📸 Preview */}
      {photo ? (
        <img
          src={photo}
          className="w-28 h-28 rounded-full object-cover border"
          alt="Foto"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
          Sem foto
        </div>
      )}

      {/* 📤 Upload */}
      <CldUploadWidget
        uploadPreset="uploadfontes"
        options={{
          cloudName: "dwwaom7gz",
        }}
        onSuccess={(result: any) => {
          const urlCompleto = result.info.secure_url; // 🔥 URL da imagem

          setPhoto(urlCompleto);
          updateUserPhoto(urlCompleto);
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="bg-blue-950 text-white px-3 py-1 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Alterar Foto
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
