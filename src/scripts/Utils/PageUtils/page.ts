export function isExternalLink(url: string): boolean {
  if (url.startsWith("/")) {
    return false;
  }
  try {
    return new URL(url).host !== window.location.host;
  } catch {
    const urls = [
      "http://localhost:3000",
      "https://awesome-arcade.vercel.app",
      "https://awesome-arcade-beta.vercel.app",
    ];
    try {
      return !urls.some((u) => {
        return new URL(url).host === new URL(u).host;
      });
    } catch {
      return false;
    }
  }
}

export function forceOutboundLinksToNewPage(parent: Element) {
  const elements: Element[] = [parent];
  while (elements.length > 0) {
    const e = elements.splice(0, 1)[0];
    if (e.tagName === "A" && isExternalLink((e as HTMLAnchorElement).href)) {
      (e as HTMLAnchorElement).target = "_blank";
      (e as HTMLAnchorElement).rel = "noopener noreferrer";
    }
    if (e.children.length > 0) {
      for (let i = 0; i < e.children.length; i++) {
        elements.push(e.children[i]);
      }
    }
  }
}
