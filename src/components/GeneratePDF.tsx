type Props = {
  onPreview: () => void;
};

export function GeneratePDF({ onPreview }: Props) {
  return (
    <button
      onClick={onPreview}
      className="bg-blue-900 text-white px-3 py-1 rounded"
    >
      Recibo
    </button>
  );
}
