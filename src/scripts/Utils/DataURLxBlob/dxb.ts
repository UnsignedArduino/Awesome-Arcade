// https://stackoverflow.com/a/30407959/10291933

//**dataURL to blob**
export function dataURLtoBlob(dataurl: string): Blob | undefined {
  const arr = dataurl.split(",");
  const match = arr[0].match(/:(.*?);/);
  if (match == undefined) {
    return undefined;
  }
  const mime = match[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

//**blob to dataURL**
export function blobToDataURL(
  blob: Blob,
  callback: (_: string | ArrayBuffer | null) => void
) {
  const a = new FileReader();
  a.onload = function (e) {
    if (e.target != undefined) {
      callback(e.target.result);
    } else {
      callback(null);
    }
  };
  a.readAsDataURL(blob);
}
