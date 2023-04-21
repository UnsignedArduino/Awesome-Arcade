export namespace AnalyticEvents {
  export function sendAwesomeClick(repo: string) {
    window.gtag("event", "click_awesome", {
      repository: repo,
    });
  }

  export function sendSearch(query: string) {
    window.gtag("event", "search", {
      query,
    });
  }
}
