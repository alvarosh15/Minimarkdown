import { heading, bold, italic, listItem, link } from "./Rules.js";

export class Tokenizer {
  constructor() {
    this.rules = [
      {
        type: "header",
        pattern: heading,
        parse: (match) => ({ level: match[1].length, text: match[2] }),
      },
      {
        type: "listItem",
        pattern: listItem,
        parse: (match) => ({ text: match[1] }),
      },
    ];
  }

  tokenizeInline(text) {
    let inlineTokens = [];

    const patterns = [
      { type: "bold", regex: bold },
      { type: "italic", regex: italic },
      { type: "link", regex: link },
    ];

    let cursor = 0;
    let matches = [];
    let match;

    patterns.forEach((pattern) => {
      while ((match = pattern.regex.exec(text)) !== null) {
        let isRepeated = false;
        matches.forEach((m) => {
          if (m.index === match.index) {
            isRepeated = true;
          }
        });
        if (!isRepeated) {
          matches.push({
            type: pattern.type,
            text: match[1],
            href: match[2],
            index: match.index,
            length: match[0].length,
          });
        }
      }
    });

    matches.sort((a, b) => a.index - b.index);

    matches.forEach((m) => {
      if (m.index > cursor) {
        inlineTokens.push({
          type: "text",
          text: text.substring(cursor, m.index),
        });
      }
      if (m.type === "link") {
        inlineTokens.push({ type: m.type, text: m.text, href: m.href });
      } else {
        inlineTokens.push({ type: m.type, text: m.text });
      }

      cursor = m.index + m.length;
    });

    if (cursor < text.length) {
      inlineTokens.push({ type: "text", text: text.substring(cursor) });
    }

    return inlineTokens;
  }

  tokenize(line) {
    for (let rule of this.rules) {
      let match = line.match(rule.pattern);
      if (match) {
        return { type: rule.type, ...rule.parse(match) };
      }
    }
    return this.tokenizeInline(line);
  }
}
