import { log } from "./misc";

export function truncate(
  text: string,
  prefferedLength: number = 100,
  truncateBy: "words" | "chars" = "words"
) {
  if (truncateBy === "words") {
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

  if (truncateBy === "chars") {
    let truncatedText = text
      .trim()
      .split("")
      .slice(0, prefferedLength)
      .join("");

    if (truncatedText.length < text.trim().length) {
      truncatedText = `${truncatedText}…`;
    }

    return truncatedText;
  }

  log({ message: "Wrong truncateBy prop passed to truncate() function" });
  return text;
}
