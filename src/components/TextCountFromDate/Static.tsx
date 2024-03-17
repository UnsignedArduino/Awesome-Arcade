import { formatDuration } from "@/scripts/Utils/DateAndTime/Format";
import React from "react";

export function StaticLowPrecisionTextCountup({
  date,
}: {
  date: Date;
}): React.ReactNode {
  const [show, setShow] = React.useState(false);
  const timeSince = Date.now() - date.getTime();

  React.useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>{show ? (timeSince > 0 ? formatDuration(timeSince) : null) : null}</>
  );
}
