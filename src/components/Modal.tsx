"use client";

export function Modal({ open, onClose, children }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[400px]">
        {children}
        <button onClick={onClose} className="mt-4 text-sm">
          Fechar
        </button>
      </div>
    </div>
  );
}
