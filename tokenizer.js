function processInLine(block) {
  // We are going to process here:
  // - Italic
  // - Bold

  let specialChars = ["*"];
  let fragments = [];

  const takeNormalText = () => {
    let characters = [];

    let i = 0;

    while (i < block.length) {
      if (specialChars.includes(block[i])) {
        break;
      }
      characters.push(block[i]);
      i++;
    }
    block = block.slice(i);
    return characters.join("");
  };

  while (block.length) {
    switch (block[0]) {
      case "*":
        if (block[1] === "*") {
          block = block.slice(2);
          fragments.push({
            type: "bold",
            content: takeNormalText(),
          });
          block = block.slice(2);
          break;
        } else {
          block = block.slice(1);
          fragments.push({
            type: "italic",
            content: takeNormalText(),
          });
          block = block.slice(1);
        }
        break;
      default:
        fragments.push({
          type: "normal",
          content: takeNormalText(),
        });
        break;
    }
  }
  return fragments;
}

export function processBlock(block) {
  // We are going to proccess here:
  // - Headers

  block = block.trim();

  if (block.startsWith("#")) {
    let level = 0;
    while (block[level] === "#") {
      level++;
    }
    return {
      type: `h${level}`,
      content: processInLine(block.slice(level).trim()),
    };
  } else {
    return { type: "p", content: processInLine(block) };
  }
}
