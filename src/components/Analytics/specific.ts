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

  export function sendExperimentView(
    experimentId: string,
    variationId: string,
  ) {
    window.gtag("event", "view_experiment", {
      experimentId,
      variationId,
    });
  }
}
