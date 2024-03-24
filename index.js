import { parseMarkdown } from "./render.js";
import { parse } from "./parser.js";
import { processBlock } from "./tokenizer.js";

const markdown = `# Hello World
## This is a *paragraph* and this is **bold**.
This is a another *paragraph* and this is **test.**`;

let tokens = [];

let blocks = markdown.split("\n");

for (let block of blocks) {
  let token = processBlock(block);
  tokens.push(token);
}
//console.log(JSON.stringify(tokens, null, 2));
//console.log(parse(tokens));
tokens = parse(tokens);
let wrapper = { name: "div", content: [] };
for (let token of tokens) {
  wrapper.content.push(token);
}
//console.log(wrapper);
console.log(parseMarkdown(wrapper));
