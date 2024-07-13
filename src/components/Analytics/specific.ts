import { ListLayout } from "@/components/AwesomeArcadeList/listLayout";

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

  export function setUserPreferredTheme(
    theme: "light" | "dark" | "auto light" | "auto dark",
  ) {
    // https://ithoughthecamewithyou.com/post/user-scoped-custom-dimensions-in-google-analytics-4-using-gtag
    console.log(`Setting user preferred theme to ${theme}`);
    window.gtag("set", "user_properties", { theme: theme });
  }

  export function setUserPreferredLayout(layout: ListLayout) {
    console.log(`Setting user preferred layout to ${layout}`);
    window.gtag("set", "user_properties", { layout: layout });
  }
}
