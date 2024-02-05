import { parseMarkdown } from "./Parser.js";

const markdownText = `# TítuloPárrafo
  *de* hola a todos **texto**
* lista
- prueba
  `;
let debug = process.argv.includes("--debug");
console.log(parseMarkdown(markdownText, debug));
