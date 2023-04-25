export function isExternalLink(url: string): boolean {
  try {
    return new URL(url).host !== window.location.host;
  } catch {
    return false;
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
