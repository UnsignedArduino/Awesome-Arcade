// https://makecode.com/_6PxgYeYC4gCL
// https://arcade.makecode.com/17313-93372-73584-92526
export function validateGameURL(u: string): boolean {
  try {
    const url = new URL(u);
    return url.host == "arcade.makecode.com" || url.host == "makecode.com";
  } catch (_) {
    return false;
  }
}

export async function getGameInfo(u: string): Promise<{
  title: string;
  thumbURL: string;
}> {
  if (!validateGameURL(u)) {
    throw new Error("Invalid game URL!");
  }
  const response = await fetch(u);
  if (response.status !== 200) {
    throw new Error("Response status is not 200!");
  }
  const text = await response.text();
  const metaStart = text.indexOf("og:title");
  const rest = text.slice(metaStart + 19);
  const titleEnd = text.indexOf('" />\n');
  const title = rest.slice(0, titleEnd);
  return {
    title: title,
    thumbURL: `https://pxt.azureedge.net/api${new URL(u).pathname}/thumb`,
  };
}

export async function isGameOnline(joinCode: string): Promise<boolean> {
  try {
    return (
      (await fetch(`https://mp.makecode.com/api/game/exists/${joinCode}`))
        .status === 200
    );
  } catch (_) {
    return false;
  }
}
