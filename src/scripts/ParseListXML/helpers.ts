export function stringToBool(str: string): boolean {
  return (
    str != undefined &&
    ["true", "t", "1"].indexOf(str.toLowerCase().trim()) !== -1
  );
}

export function findElementInElement(element: any, elementName: string): any {
  if (element instanceof Array) {
    for (const e of element) {
      const result = findElementInElement(e, elementName);
      if (result != undefined) {
        return result;
      }
    }
    return undefined;
  } else {
    for (const key of Object.keys(element)) {
      if (key === elementName) {
        return element;
      }
    }
    return undefined;
  }
}

export function findElementWithAttributeValue(
  elements: any[],
  attributeName: string,
  attributeValue: string,
): any {
  for (const element of elements) {
    const attributes = element[":@"];
    if (attributes != undefined) {
      if (attributes[`@_${attributeName}`] === attributeValue) {
        return element;
      }
    }
  }
  return undefined;
}
