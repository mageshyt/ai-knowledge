import { format } from "date-fns";

import { Remarkable } from "remarkable";
//export const markdownToHtml = (markdown: string): string => {
//  const md = new Remarkable();
//  return md.render(markdown);
//};

export const HtmlToText = (html: string): string => {
  return html.replace(/<[^>]*>?/gm, "");
};

export const markdownToHtml = (markdown: string): string => {
  const md = new Remarkable();
  return md.render(markdown);
};

export function dateFormat(
  date: Date | string | number,
  formatString: string = "dd MMM"
) {
  return format(new Date(date), formatString);
}

export function truncate(str: string, n: number) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}
