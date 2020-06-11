export default function getInputSiblings(node) {
  let result = [];
  const siblings = node.childNodes;
  for (let i = 0; i < siblings.length; ++i)
    if (siblings[i].nodeName.toLowerCase() === "input")
      result.push(siblings[i].value);
  return result;
}

export function canBeCloned(val) {
  if (Object(val) !== val)
    // Primitive value
    return true;
  switch (
    {}.toString.call(val).slice(8, -1) // Class
  ) {
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "RegExp":
    case "Blob":
    case "FileList":
    case "ImageData":
    case "ImageBitmap":
    case "ArrayBuffer":
      return true;
    case "Array":
    case "Object":
      return Object.keys(val).every((prop) => DAO.canBeCloned(val[prop]));
    case "Map":
      return (
        [...val.keys()].every(DAO.canBeCloned) &&
        [...val.values()].every(DAO.canBeCloned)
      );
    case "Set":
      return [...val.keys()].every(DAO.canBeCloned);
    default:
      return false;
  }
}
