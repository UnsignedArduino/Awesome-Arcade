import Link from "next/link";
import React from "react";
import { AD_CLASSES } from "./adClasses";
import { getCookie, setCookie } from "@/scripts/Utils/Cookies";

function FakeAd(): React.ReactNode {
  return (
    <div
      id="detect"
      className={AD_CLASSES.join(" ")}
      style={{
        height: "1px",
        width: "1px",
        position: "absolute",
        left: "-999em",
        top: "-999em",
      }}
    ></div>
  );
}

function detectAdblock(): Promise<boolean> {
  const e = window.document.getElementById("detect");

  const simpleDetect = e === null || getComputedStyle(e)["display"] == "none";

  if (simpleDetect) {
    return new Promise((resolve) => {
      resolve(true);
    });
  } else {
    // https://stackoverflow.com/a/74145107/10291933
    return new Promise((resolve) => {
      fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
        mode: "no-cors",
      })
        .then((response) => {
          resolve(response.redirected);
        })
        .catch(() => {
          resolve(true);
        });
    });
  }
}

export function AdblockDetectionBanner(): React.ReactNode {
  const [showMessage, setShowMessage] = React.useState(false);
  const [userClosed, setUserClosed] = React.useState(false);

  const ADBLOCK_DETECTION_IGNORE_COOKIE = "adblockDetectionIgnored";
  const ADBLOCK_DETECTION_IGNORE_COOKIE_EXPIRE = 60 * 60 * 24; // seconds

  React.useEffect(() => {
    if (getCookie(ADBLOCK_DETECTION_IGNORE_COOKIE) != undefined) {
      return;
    }
    detectAdblock().then((running) => {
      setShowMessage(running);
    });
  });

  return (
    <>
      <FakeAd />
      {showMessage && !userClosed ? (
        <div
          className="alert alert-secondary alert-dismissible m-2"
          role="alert"
        >
          Hey there! It looks like you are using an ad blocker, which we totally
          understand! <Link href="/help/why-ads">Read more...</Link>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setUserClosed(true);
              setCookie(
                ADBLOCK_DETECTION_IGNORE_COOKIE,
                "true",
                ADBLOCK_DETECTION_IGNORE_COOKIE_EXPIRE,
              );
            }}
            aria-label="Close"
          ></button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AdblockDetectionBanner;
