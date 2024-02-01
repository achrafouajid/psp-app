import html2PDF from "jspdf-html2canvas";

export async function downloadElementAsImage(element: HTMLDivElement) {
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
