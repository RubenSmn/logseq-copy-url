import { doc, globals } from "./global";

export const getExternalLinks = () => {
  return [
    ...doc.querySelectorAll(globals.extLinksSelector),
  ] as HTMLAnchorElement[];
};

export const getEmailLinks = () => {
  // Query all links with mailto: href directly
  const allLinks = [...doc.querySelectorAll('a[href^="mailto:"]')] as HTMLAnchorElement[];
  return allLinks;
};
