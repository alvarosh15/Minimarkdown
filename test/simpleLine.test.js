import { expect, test } from "vitest";
import { parseMarkdown } from "./Parser.js";

/* Here will be all simple line tests,
   it means that here there will only be testing
   on singles lines, both with preview and not preview */

test("Simple text line", () => {
  expect(parseMarkdown("Hello, world!")).toBe("<p>Hello, world!</p>");
});

test("Simple text line with bold", () => {
  expect(
    parseMarkdown("Hello, **world!**", { debug: false, preview: true })
  ).toBe("<p>Hello, <strong>**world!**</strong></p>");
  expect(
    parseMarkdown("Hello, **world!**", { debug: false, preview: false })
  ).toBe("<p>Hello, <strong>world!</strong></p>");
});

test("Simple text line with italic", () => {
  expect(
    parseMarkdown("Hello, *world!*", { debug: false, preview: true })
  ).toBe("<p>Hello, <em>*world!*</em></p>");
  expect(
    parseMarkdown("Hello, *world!*", { debug: false, preview: false })
  ).toBe("<p>Hello, <em>world!</em></p>");
});
