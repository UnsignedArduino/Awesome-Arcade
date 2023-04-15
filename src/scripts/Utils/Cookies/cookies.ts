export function setCookie(
  cookieName: string,
  cookieValue: string,
  expireInSecs: number
) {
  let date = new Date();
  date.setTime(date.getTime() + expireInSecs * 1000);
  document.cookie = `${cookieName} = ${encodeURIComponent(
    cookieValue
  )}; expires = ${date.toUTCString()}`;
  // console.log(new Date().toUTCString());
  // console.log(
  //   `${cookieName} = ${encodeURIComponent(
  //     cookieValue
  //   )}; expires = ${date.toUTCString()}`
  // );
}

export function getCookie(cookieName: string): string | undefined {
  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.split("=")[0] === cookieName);

  if (cookieValue) {
    return decodeURIComponent(cookieValue.split("=")[1]);
  } else {
    return undefined;
  }
}
