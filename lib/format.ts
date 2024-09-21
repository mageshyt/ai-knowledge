import { format } from "date-fns";

//export const markdownToHtml = (markdown: string): string => {
//  const md = new Remarkable();
//  return md.render(markdown);
//};

export const HtmlToText = (html: string): string => {
  return html.replace(/<[^>]*>?/gm, "");
};


export function dateFormat(
  date: Date | string | number,
  formatString: string = "dd MMM"
) {
  return format(new Date(date), formatString);
}
