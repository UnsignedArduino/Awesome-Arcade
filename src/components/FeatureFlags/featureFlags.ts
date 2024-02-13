import { GrowthBook } from "@growthbook/growthbook-react";
import { getEnvironment } from "@/components/WithAppProps";
import { AnalyticEvents } from "@/components/Analytics";

export const growthbook = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_API_KEY,
  enableDevMode: getEnvironment() === "development",
  subscribeToChanges: true,
  trackingCallback: (experiment, result) => {
    AnalyticEvents.sendExperimentView(experiment.key, result.key);
  },
});
