export function parse(tokens) {
  if (typeof tokens === "string") {
    return tokens;
  }
  let result = tokens.map((token) => {
    if (token.type === "normal") {
      return token.content;
    }
    return tag(token.type, parse(token.content), {});
  });

  return result;
}

function tag(name, content = [], attributes = {}) {
  return { name, content, attributes };
}
