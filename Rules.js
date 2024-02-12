const heading = /^(#+)\s+(.*)$/;
const paragraph = /^(.+)$/;
const bold = /\*\*(.+?)\*\*(?!\*)/g;
const italic = /\*(.+?)\*(?!\*)/g;
const listItem = /^[-*+]\s+(.*)$/;
const link = /\[(.*?)\]\((.*?)\)/g;

export { heading, paragraph, bold, italic, listItem, link };
