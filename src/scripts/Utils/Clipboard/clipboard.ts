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

export function copyTextToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard) {
      if (copyToClipboardFallback(text)) {
        resolve();
      } else {
        reject();
      }
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        resolve();
      },
      (err) => {
        console.error(
          "Failed to copy text to clipboard, using fallback: " + err,
        );
        if (copyToClipboardFallback(text)) {
          resolve();
        } else {
          reject();
        }
      },
    );
  });
}

export function readTextFromClipboard(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard) {
      reject();
    }
    navigator.clipboard.readText().then(
      (text) => {
        resolve(text);
      },
      (err) => {
        console.error("Failed to read from clipboard: " + err);
        reject();
      },
    );
  });
}

// https://stackoverflow.com/a/59162806/10291933
export function copyBlobsToClipboard(items: ClipboardItems): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard) {
      reject();
      return;
    }
    try {
      navigator.clipboard
        .write(items)
        .then(() => {
          resolve();
        })
        .catch(() => {
          console.error("Failed to copy items to clipboard");
          reject();
        });
    } catch (err) {
      console.error("Failed to copy items to clipboard");
      reject();
    }
  });
}

export function readBlobsFromClipboard(): Promise<ClipboardItems> {
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard) {
      reject();
    }
    navigator.clipboard
      .read()
      .then((clipboardItems) => {
        resolve(clipboardItems);
      })
      .catch(() => {
        console.error("Failed to read items from clipboard");
        reject();
      });
  });
}
