export function parseMarkdown(element) {
  let pieces = [];

  const render = (element) => {
    if (typeof element === "string") {
      pieces.push(element);
    } else {
      pieces.push(`<${element.name}>`);
      for (let piece of element.content) render(piece);
      pieces.push(`</${element.name}>`);
    }
  };

  render(element);

  return pieces.join("");
}
