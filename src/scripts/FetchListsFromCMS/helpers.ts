export function partsFromURL(repoURL: string) {
  const url = repoURL.endsWith("/") ? repoURL.slice(0, -1) : repoURL;
  const repo = (() => {
    const pieces = url.split("/");
    return pieces[pieces.length - 2] + "/" + pieces[pieces.length - 1];
  })();
  const title = repo.split("/")[1];
  const author = repo.split("/")[0];

  return [url, repo, title, author];
}
