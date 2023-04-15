// https://stackoverflow.com/a/30810322/10291933
function copyToClipboardFallback(text: string): boolean {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  let successful = false;
  try {
    successful = document.execCommand("copy");
  } catch (err) {
    console.error("Failed to copy to clipboard: " + err);
  }
  document.body.removeChild(textArea);
  return successful;
}

export function copyTextToClipboard(text: string): boolean {
  if (!navigator.clipboard) {
    return copyToClipboardFallback(text);
  }
  navigator.clipboard.writeText(text).then(
    () => {},
    (err) => {
      console.error("Failed to copy text to clipboard, using fallback: " + err);
      copyToClipboardFallback(text);
    }
  );
  return true;
}

export function readTextFromClipboard(
  callback: (_text: string | undefined) => void
): void {
  if (!navigator.clipboard) {
    return;
  }
  navigator.clipboard.readText().then(
    (text) => {
      callback(text);
    },
    (err) => {
      console.error("Failed to read from clipboard: " + err);
      callback(undefined);
    }
  );
}

// https://stackoverflow.com/a/59162806/10291933
export function copyPNGImageBlobToClipboard(imgBlob: Blob): boolean {
  if (!navigator.clipboard) {
    return false;
  }
  try {
    navigator.clipboard.write([new ClipboardItem({ "image/png": imgBlob })]);
    return true;
  } catch (err) {
    console.error("Failed to copy image to clipboard");
    return false;
  }
}
