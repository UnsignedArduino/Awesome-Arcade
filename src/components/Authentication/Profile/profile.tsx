import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button
          type="button"
          className="btn p-0"
          data-bs-target="#profileOffcanvas"
          data-bs-toggle="offcanvas"
          aria-controls="profileOffcanvas"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session.user!.image!}
            alt={`Profile picture of ${session.user!.name}`}
            style={{
              width: "2em",
              height: "2em",
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-target="#profileOffcanvas"
          data-bs-toggle="offcanvas"
          aria-controls="profileOffcanvas"
        >
          Sign in
        </button>
      </>
    );
  }
}
