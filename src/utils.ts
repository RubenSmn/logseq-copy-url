import { doc, globals } from "./global";

export const getExternalLinks = () => {
  return [
    ...doc.querySelectorAll(globals.extLinksSelector),
  ] as HTMLAnchorElement[];
};
