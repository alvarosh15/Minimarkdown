export class Renderer {
  render(tokens, preview = false) {
    let html = "";
    tokens.forEach((token) => {
      switch (token.type) {
        case "header":
          let htmlText = "";
          for (let i = 0; i < token.level; i++) {
            htmlText += "#";
          }
          if (preview) {
            html += `<h${token.level}>${htmlText} ${token.text}</h${token.level}> `;
          } else {
            html += `<h${token.level}>${token.text}</h${token.level}> `;
          }

          break;
        case "listItem":
          html += `<li>${token.text}</li>`;
          break;
        default:
          if (this.renderInline(token) === "") {
            html += "<br>";
          } else {
            html += `<p>${this.renderInline(token, preview)}</p>`;
          }
      }
    });
    return html;
  }

  renderInline(inlineTokens, preview = false) {
    return inlineTokens
      .map((token) => {
        switch (token.type) {
          case "bold":
            if (preview) {
              return `<strong>**${token.text}**</strong>`;
            } else {
              return `<strong>${token.text}</strong>`;
            }
          case "italic":
            if (preview) {
              return `<em>*${token.text}*</em>`;
            } else {
              return `<em>${token.text}</em>`;
            }
          case "link":
            if (preview) {
              return `<a href="${token.href}" target="_blank">[${token.text}](${token.href})</a>`;
            } else {
              return `<a href="${token.href}" target="_blank">${token.text}</a>`;
            }
          case "text":
          default:
            return token.text;
        }
      })
      .join("");
  }
}
