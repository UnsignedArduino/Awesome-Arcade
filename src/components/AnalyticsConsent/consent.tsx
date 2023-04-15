import React from "react";
import {
  getAdsDataRedaction,
  getAdStorageConsent,
  getAnalyticsStorageConsent,
  setAdsDataRedaction,
  setAdStorageConsent,
  setAnalyticsStorageConsent,
} from "../Analytics/analytics";

function AdStorageConsent({
  consentChangedSetter,
}: {
  consentChangedSetter: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [adStorageConsentValue, setAdStorageConsentValue] =
    React.useState<string>("denied");

  React.useEffect(() => {
    setAdStorageConsentValue(getAdStorageConsent());
  }, []);

  React.useEffect(() => {
    consentChangedSetter(adStorageConsentValue !== getAdStorageConsent());
  }, [adStorageConsentValue, consentChangedSetter]);

  return (
    <div className="input-group mb-1">
      <span className="input-group-text" id="adsStorageConsentLabel">
        Advertisement cookies{" "}
      </span>
      <select
        className="form-select"
        id="useGoogleAnalyticsSelect"
        value={adStorageConsentValue}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setAdStorageConsentValue(event.target.selectedOptions[0].value);
        }}
        aria-labelledby="adsStorageConsentLabel"
      >
        <option value="denied">Denied</option>
        <option value="granted">Granted</option>
      </select>
    </div>
  );
}

function AdsDataRedaction({
  consentChangedSetter,
}: {
  consentChangedSetter: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [adsDataRedactionValue, setAdsDataRedactionValue] =
    React.useState<string>("denied");

  React.useEffect(() => {
    setAdsDataRedactionValue(getAdsDataRedaction());
  }, []);

  React.useEffect(() => {
    consentChangedSetter(adsDataRedactionValue !== getAdsDataRedaction());
  }, [adsDataRedactionValue, consentChangedSetter]);

  return (
    <div className="input-group mb-1">
      <span className="input-group-text" id="adsDataRedactionLabel">
        Advertisement data redaction{" "}
      </span>
      <select
        className="form-select"
        id="adsDataRedactionSelect"
        value={adsDataRedactionValue}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setAdsDataRedactionValue(event.target.selectedOptions[0].value);
        }}
        aria-labelledby="adsDataRedactionLabel"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </div>
  );
}

function AnalyticsStorageConsent({
  consentChangedSetter,
}: {
  consentChangedSetter: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [analyticsStorageConsentValue, setAnalyticsStorageConsentValue] =
    React.useState<string>("denied");

  React.useEffect(() => {
    setAnalyticsStorageConsentValue(getAnalyticsStorageConsent());
  }, []);

  React.useEffect(() => {
    consentChangedSetter(
      analyticsStorageConsentValue !== getAnalyticsStorageConsent()
    );
  }, [analyticsStorageConsentValue, consentChangedSetter]);

  return (
    <div className="input-group mb-1">
      <span className="input-group-text" id="analyticsStorageConsentLabel">
        Analytic cookies{" "}
      </span>
      <select
        className="form-select"
        id="analyticsStorageConsentSelect"
        value={analyticsStorageConsentValue}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setAnalyticsStorageConsentValue(
            event.target.selectedOptions[0].value
          );
        }}
        aria-labelledby="analyticsStorageConsentLabel"
      >
        <option value="denied">Denied</option>
        <option value="granted">Granted</option>
      </select>
    </div>
  );
}

export function AnalyticsConsent(): JSX.Element {
  const [showReloadRequired, setShowReloadRequired] =
    React.useState<boolean>(false);
  const [adStorageConsentChanged, setAdStorageConsentChanged] =
    React.useState<boolean>(false);
  const [adsDataRedactionConsentChanged, setAdsDataRedactionConsentChanged] =
    React.useState<boolean>(false);
  const [analyticsStorageConsentChanged, setAnalyticsStorageConsentChanged] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setShowReloadRequired(
      adStorageConsentChanged ||
        adsDataRedactionConsentChanged ||
        analyticsStorageConsentChanged
    );
  }, [
    adStorageConsentChanged,
    adsDataRedactionConsentChanged,
    analyticsStorageConsentChanged,
  ]);

  return (
    <>
      <AdStorageConsent consentChangedSetter={setAdStorageConsentChanged} />
      <AdsDataRedaction
        consentChangedSetter={setAdsDataRedactionConsentChanged}
      />
      <AnalyticsStorageConsent
        consentChangedSetter={setAnalyticsStorageConsentChanged}
      />
      {showReloadRequired ? (
        <div className="alert alert-warning mt-2" role="alert">
          A reload is required for changes to take effect.
          <button
            className="btn btn-primary btn-sm ms-2"
            onClick={() => {
              const getElement = (id: string): HTMLElement => {
                const e = document.getElementById(id);
                if (e != undefined) {
                  return e;
                } else {
                  throw new Error("Could not get element with ID " + id);
                }
              };
              setAdStorageConsent(
                (getElement("useGoogleAnalyticsSelect") as HTMLSelectElement)
                  .selectedOptions[0].value
              );
              setAdsDataRedaction(
                (getElement("adsDataRedactionSelect") as HTMLSelectElement)
                  .selectedOptions[0].value
              );
              setAnalyticsStorageConsent(
                (
                  getElement(
                    "analyticsStorageConsentSelect"
                  ) as HTMLSelectElement
                ).selectedOptions[0].value
              );
              window.location.reload();
            }}
          >
            Reload
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AnalyticsConsent;
