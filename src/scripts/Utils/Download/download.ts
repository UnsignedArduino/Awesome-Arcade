export function downloadSomething(href: string, fileName: string): void {
  const downloader = document.createElement("a");
  downloader.setAttribute("href", href);
  downloader.setAttribute("download", fileName);
  downloader.hidden = true;
  document.body.appendChild(downloader);
  downloader.click();
  document.body.removeChild(downloader);
}

export default function downloadText(text: string, fileName: string): void {
  downloadSomething(
    "data:text/plain;charset=utf-16," + encodeURIComponent(text),
    fileName
  );
}
