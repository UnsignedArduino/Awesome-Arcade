export namespace AnalyticEvents {
  export function sendAwesomeClick(type: "extension" | "tool", repo: string) {
    window.gtag("event", "click_awesome", {
      type,
      repository: repo,
    });
  }

  export function sendSearch(query: string) {
    window.gtag("event", "search", {
      query,
    });
  }

  export function sendShare(
    type: "extension" | "tool" | "blog" | "blog preview",
    name: string,
  ) {
    window.gtag("event", "share", {
      type,
      name,
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
