"use client";

type Props = {
  html: string;
  onClose: () => void;
};

export function ReceiptModal({ html, onClose }: Props) {
  function handlePrint() {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      win.print();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[800px] h-[90vh] rounded-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between p-4 border-b">
          <h2 className="font-bold">Preview Recibo</h2>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="bg-blue-900 text-white px-4 py-2 rounded"
            >
              Gerar PDF
            </button>

            <button onClick={onClose} className="border px-4 py-2 rounded">
              Fechar
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <iframe srcDoc={html} className="flex-1 w-full" />
      </div>
    </div>
  );
}
