export default function getElement(id: string): HTMLElement {
  const e = document.getElementById(id);
  if (e != undefined) {
    return e;
  } else {
    throw new Error(`Unable to get element with id ${id}`);
  }
}
