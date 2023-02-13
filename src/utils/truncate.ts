export function truncate(text: string, prefferedLength: number = 100) {
  let numOfChars = 0;
  let result = "";
  const splitText = text.split(" ");
  for (let i = 0; i < splitText.length; i++) {
    const item = splitText[i];

    if (numOfChars >= prefferedLength) {
      break;
    } else {
      const itemWithSpace = `${item} `;
      result = result + itemWithSpace;
      numOfChars = numOfChars + itemWithSpace.length;
    }
  }
  return result.trim() + "…";
}
