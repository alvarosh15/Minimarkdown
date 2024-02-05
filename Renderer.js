export class Renderer {
  render(tokens) {
    let html = "";
    tokens.forEach((token) => {
      switch (token.type) {
        case "header":
          let htmlText = "";
          for (let i = 0; i < token.level; i++) {
            htmlText += "#";
          }
          html += `<h${token.level}>${htmlText} ${token.text}</h${token.level}> `;
          break;
        case "listItem":
          html += `<li>${token.text}</li>`;
          break;
        default:
          if (this.renderInline(token) === "") {
            html += "<br>";
          } else {
            html += `<p>${this.renderInline(token)}</p>`;
          }
      }
    });
    return html;
  }

  renderInline(inlineTokens) {
    return inlineTokens
      .map((token) => {
        switch (token.type) {
          case "bold":
            return `<strong>**${token.text}**</strong>`;
          case "italic":
            return `<em>*${token.text}*</em>`;
          case "text":
          default:
            return token.text;
        }
      })
      .join("");
  }
}
