import Link from "next/link";
import React from "react";
import { getCookie, setCookie } from "@/scripts/Utils/Cookies";

export function TOSBanner(): React.ReactNode {
  const [showMessage, setShowMessage] = React.useState(false);
  const [userClosed, setUserClosed] = React.useState(false);

  const TOS_BANNER_COOKIE = "shownTOSBanner";
  const TOS_BANNER_COOKIE_EXPIRE = 60 * 60 * 24 * 365; // seconds

  React.useEffect(() => {
    setShowMessage(getCookie(TOS_BANNER_COOKIE) == undefined);
  }, []);

  return (
    <>
      {showMessage && !userClosed ? (
        <div className="alert alert-primary alert-dismissible m-2" role="alert">
          Like literally every other website on Earth, by using this website you
          agree to the{" "}
          <Link href="/legal/terms-of-service">terms of service</Link>.
          <Link
            className="btn btn-secondary btn-sm ms-1"
            href="/legal/terms-of-service"
            role="button"
          >
            Learn more
          </Link>
          <Link
            className="btn btn-secondary btn-sm ms-1"
            href="/legal/external-services-and-data-collection"
            role="button"
          >
            Disable cookies
          </Link>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setUserClosed(true);
              setCookie(TOS_BANNER_COOKIE, "true", TOS_BANNER_COOKIE_EXPIRE);
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

export default TOSBanner;
