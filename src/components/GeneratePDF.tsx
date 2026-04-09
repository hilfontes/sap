type Props = {
  html: string;
};

export function GeneratePDF({ html }: Props) {
  function handlePrint() {
    const iframe = document.createElement("iframe");

    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;

    if (!doc) return;

    doc.open();
    doc.write(html);
    doc.close();

    // 👇 esperar renderização REAL do DOM
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 300);
  }

  return (
    <button
      onClick={handlePrint}
      className="bg-blue-900 text-white px-3 py-1 rounded"
    >
      Recibo
    </button>
  );
}
