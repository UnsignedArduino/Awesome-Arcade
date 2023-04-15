import React, { ErrorInfo } from "react";
import { copyTextToClipboard } from "../../scripts/Utils/Clipboard";
import { NotificationType, notify } from "../Notifications";

type ErrorBoundaryProps = {
  children: JSX.Element | JSX.Element[];
};

type ErrorBoundaryState = {
  error: Error | undefined;
  errorInfo: ErrorInfo | undefined;
};

export class ErrorBoundary extends React.Component {
  public props: ErrorBoundaryProps;
  public state: ErrorBoundaryState;

  protected errorStack: string | undefined;

  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
    this.state = { error: undefined, errorInfo: undefined };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  public render() {
    if (this.state.errorInfo != undefined) {
      this.errorStack = `${this.state.error && this.state.error.toString()}\n${
        this.state.errorInfo.componentStack
      }`;
      return (
        <div className="container-fluid p-2">
          <h1>Sorry, something went wrong</h1>
          <p>
            Try refreshing the page. If this keeps happening, you can report{" "}
            <a
              href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              this issue
            </a>{" "}
            in the GitHub repository.
          </p>
          <button
            type="button"
            className="btn btn-primary me-1"
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh page
          </button>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary>Stack trace</summary>
            <pre>{this.errorStack}</pre>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (this.errorStack != undefined) {
                  if (copyTextToClipboard(this.errorStack)) {
                    notify("Copied to clipboard!", NotificationType.Success);
                  } else {
                    notify(
                      "Unable to copy to clipboard!",
                      NotificationType.Error
                    );
                  }
                } else {
                  notify(
                    "Unable to copy to clipboard!",
                    NotificationType.Error
                  );
                }
              }}
            >
              Copy all to clipboard
            </button>
          </details>
        </div>
      );
    } else {
      this.errorStack = undefined;
      return this.props.children;
    }
  }
}

export function ThrowARenderingExceptionHerePlease(): JSX.Element {
  throw new Error("LOL");
  return <></>;
}

export default ErrorBoundary;
