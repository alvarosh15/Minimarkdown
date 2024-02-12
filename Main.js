import { parseMarkdown } from "./Parser.js";

const markdownText = `[titulo](https://www.google.com)`;
let debug = process.argv.includes("--debug");
console.log(parseMarkdown(markdownText, debug));
