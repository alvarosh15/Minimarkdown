import { Tokenizer } from "./Tokenizer.js";
import { Renderer } from "./Renderer.js";

export function parseMarkdown(markdownText, debug = false) {
  const tokenizer = new Tokenizer();
  const renderer = new Renderer();
  const lines = markdownText.split("\n");
  if (debug) console.log(lines);
  const tokens = lines
    .map((line) => {
      const token = tokenizer.tokenize(line);
      if (debug) console.log(token);
      return token;
    })
    .filter((token) => token !== null);
  return renderer.render(tokens);
}
