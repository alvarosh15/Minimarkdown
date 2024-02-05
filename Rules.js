const heading = /^(#+)\s+(.*)$/;
const paragraph = /^(.+)$/;
const bold = /\*\*(.+?)\*\*(?!\*)/g;
const italic = /\*(.+?)\*(?!\*)/g;
const listItem = /^[-*]\s+(.*)$/;

export { heading, paragraph, bold, italic, listItem };
