import { formatDuration } from "@/scripts/Utils/DateAndTime/Format";
import React from "react";

export function TextCountdown({
  date,
  updatePeriod,
  onEnd,
}: {
  date: Date;
  updatePeriod?: number;
  onEnd?: () => void;
}): React.ReactNode {
  const [timeLeft, setTimeLeft] = React.useState<number>(
    date.getTime() - Date.now(),
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(date.getTime() - Date.now());
      if (timeLeft <= 0) {
        clearInterval(interval);
        if (onEnd) {
          onEnd();
        }
      }
    }, updatePeriod ?? 100);

    return () => {
      clearInterval(interval);
    };
  }, [date, onEnd, timeLeft, updatePeriod]);

  return <>{timeLeft > 0 ? formatDuration(timeLeft) : null}</>;
}

export function TextCountup({
  date,
  updatePeriod,
  serverRender = true,
}: {
  date: Date;
  updatePeriod?: number;
  serverRender?: boolean;
}): React.ReactNode {
  const [show, setShow] = React.useState(serverRender);
  const [timeSince, setTimeSince] = React.useState<number>(
    Date.now() - date.getTime(),
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(Date.now() - date.getTime());
    }, updatePeriod ?? 100);

    return () => {
      clearInterval(interval);
    };
  }, [date, updatePeriod]);

  React.useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>{show ? (timeSince > 0 ? formatDuration(timeSince) : null) : null}</>
  );
}
