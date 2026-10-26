'use client';

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} data-print-button>
      Download PDF
    </button>
  );
}
