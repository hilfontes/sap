"use client";

import { UploadPhoto } from "@/components/ui/uploadphoto";

export function UserPhotoSection({ userId, photo }: any) {
  return (
    <div className="flex flex-col items-center gap-3">
      <UploadPhoto
        userId={userId}
        currentPhoto={
          photo
            ? `http://localhost:3001/api/${photo}`
            : "/avatar-placeholder.png"
        }
      />
    </div>
  );
}
