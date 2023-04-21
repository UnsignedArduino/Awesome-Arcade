export namespace AnalyticEvents {
  export function sendAwesomeClick(repo: string) {
    window.gtag("event", "click_awesome", {
      repository: repo,
    });
  }
}
