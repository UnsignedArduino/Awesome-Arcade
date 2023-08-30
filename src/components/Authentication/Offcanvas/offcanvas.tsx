import { signOut, useSession } from "next-auth/react";

export default function ProfileOffcanvas() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="profileOffcanvas"
          aria-labelledby="profileOffcanvasLabel"
        >
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
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
