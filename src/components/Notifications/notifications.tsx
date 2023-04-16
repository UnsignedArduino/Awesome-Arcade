import React from "react";
import { toast, ToastContainer, ToastOptions, Id, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const allOpenToasts: Id[] = [];

export function getAllOpenToasts(): Id[] {
  for (let i = allOpenToasts.length - 1; i >= 0; i--) {
    if (!toast.isActive(allOpenToasts[i])) {
      allOpenToasts.splice(i, 1);
    }
  }
  return allOpenToasts;
}

export enum NotificationType {
  Info,
  Success,
  Warning,
  Error,
  Default,
  Loading,
}

export function notify(
  text: string,
  type: NotificationType,
  autoHide?: boolean,
  progress?: number | undefined
): Id {
  const opts: ToastOptions = {
    position: "bottom-right",
    autoClose: autoHide == undefined || autoHide ? 5000 : false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: progress,
  };
  let id: Id;
  switch (type) {
    case NotificationType.Info: {
      id = toast.info(text, opts);
      break;
    }
    case NotificationType.Success: {
      id = toast.success(text, opts);
      break;
    }
    case NotificationType.Warning: {
      id = toast.warning(text, opts);
      break;
    }
    case NotificationType.Error: {
      id = toast.error(text, opts);
      break;
    }
    case NotificationType.Loading: {
      id = toast.loading(text, opts);
      break;
    }
    case NotificationType.Default:
    default: {
      id = toast(text, opts);
      break;
    }
  }
  allOpenToasts.push(id);
  return id;
}

export function promiseNotify(
  promise: Promise<any | void>,
  waiting: string,
  success: string,
  failure: string,
  autoHide?: boolean
) {
  const opts: ToastOptions = {
    position: "bottom-right",
    autoClose: autoHide == undefined || autoHide ? 5000 : false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  toast.promise(
    promise,
    { pending: waiting, error: failure, success: success },
    opts
  );
}

type LoadingNotifyReturn = {
  successCallback: () => void;
  errorCallback: () => void;
  canceledCallback: () => void;
};

export function loadingNotify(
  loadingText: string,
  successText: string,
  errorText: string,
  canceledText: string
): LoadingNotifyReturn {
  const id = toast.loading(loadingText);
  return {
    successCallback: () => {
      toast.update(id, {
        render: successText,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    },
    errorCallback: () => {
      toast.update(id, {
        render: errorText,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    },
    canceledCallback: () => {
      toast.update(id, {
        render: canceledText,
        type: "default",
        isLoading: false,
        autoClose: 5000,
      });
    },
  };
}

export function Notifications(): JSX.Element {
  const [theme, setTheme] = React.useState<Theme>("light");

  function onThemeChange(event: CustomEvent<"Dark" | "Light">) {
    setTheme(event.detail.toLowerCase() as Theme);
  }

  React.useEffect(() => {
    let theme = window.localStorage.getItem("themeUsed");
    if (theme === null) {
      theme = "light";
    } else {
      theme = theme.toLowerCase();
    }

    window.document.documentElement.addEventListener(
      "themeused",
      onThemeChange
    );

    setTheme(theme as Theme);
  }, []);

  return (
    <div
      className="mx-3 my-2"
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 9999,
        float: "right",
      }}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  );
}

export default Notifications;
