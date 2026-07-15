export function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map(word =>
      word
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : ""
    )
    .join(" ");
}