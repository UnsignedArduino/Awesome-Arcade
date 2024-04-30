import { NotificationType, notify } from "@/components/Notifications";
import React from "react";

export function ShareButton({
  data,
  classNames = "ms-1 btn btn-sm btn-link m-0 p-0",
  onClick = () => {},
}: {
  data: ShareData;
  classNames?: string;
  onClick?: () => void;
}): React.ReactNode {
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type="button"
      className={classNames}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => {
        navigator
          .share(data)
          .then(() => {
            notify("Successfully shared!", NotificationType.Success);
          })
          .catch((err) => {
            switch (err) {
              case DOMException.ABORT_ERR:
                notify("Canceled sharing.", NotificationType.Info);
                break;
              case DOMException.NOT_SUPPORTED_ERR:
                notify(
                  "Sharing is not supported in your browser!",
                  NotificationType.Error,
                );
                break;
              default:
                notify(
                  "Failed to share! Make sure you have given us permission to share!",
                  NotificationType.Error,
                );
                break;
            }
          });
        onClick();
      }}
    >
      <i className={hover ? "bi-share-fill" : "bi-share"} />
    </button>
  );
}
