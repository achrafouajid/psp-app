import html2canvas from "html2canvas";

export function downloadElementAsImage(element: HTMLElement) {
  html2canvas(element).then((canvas) => {
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
