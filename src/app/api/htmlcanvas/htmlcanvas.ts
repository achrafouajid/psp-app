export async function downloadElementAsImage(element: HTMLDivElement) {
  if (typeof window == "undefined") return;

  const html2PDF = (await import("jspdf-html2canvas")).default;
  const fileName = new Date().getTime();

  const file = await html2PDF(element, {
    jsPDF: {
      format: "a4",
    },
    imageType: "image/jpeg",
    output: `/${fileName}-generate.pdf`,
  });
  const blob = file.canvas.pdf.output("bloburi");
  const eleme = document.createElement("a");
  eleme.href = blob.href;

  eleme.download = `${fileName}-generate.pdf`;
}
