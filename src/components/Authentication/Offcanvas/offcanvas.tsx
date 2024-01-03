import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import React from "react";
import { BuiltInProviderType } from "next-auth/providers";

export default function ProfileOffcanvas() {
  const { data: session } = useSession();
  const [providers, setProviders] = React.useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  React.useEffect(() => {
    getProviders().then((result) => {
      setProviders(result);
    });
  }, []);

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="profileOffcanvas"
        aria-labelledby="profileOffcanvasLabel"
      >
        {session ? (
          <>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="profileOffcanvasLabel">
                Signed in as {session.user!.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </button>
              <div className="alert alert-info mt-3" role="alert">
                Signing in currently grants no additional features, but will be
                used in the future!
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="profileOffcanvasLabel">
                Not signed in
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <p>Sign into Awesome Arcade with a provider below!</p>
              {providers ? (
                Object.values(providers).map((provider) => {
                  const icon = {
                    GitHub: "bi-github",
                  }[provider.name];
                  return (
                    <div key={provider.name}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => signIn(provider.id)}
                      >
                        {icon != undefined ? (
                          <i className={`${icon} pe-1`} />
                        ) : undefined}{" "}
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })
              ) : (
                <p>
                  Sorry, but it looks like there aren{"'"}t any providers to
                  sign in with!
                </p>
              )}
              <div className="alert alert-info mt-3" role="alert">
                Signing in currently grants no additional features, but will be
                used in the future!
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
