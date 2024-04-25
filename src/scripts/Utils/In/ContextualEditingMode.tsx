export default function inContextualEditor(): boolean {
  try {
    // Found somewhere on the Tina discord
    return !!window.frameElement && window.frameElement.id === "tina-iframe";
  } catch {
    return false;
  }
}
