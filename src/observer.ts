import { doc } from "./global";
import { setCopyButtons, setEmailCopyButtons } from "./copyButtons";
import { getEmailLinks, getExternalLinks } from "./utils";
import { setPropertyCopyButtons } from "./propertyButtons";

let linksObserver: MutationObserver;
let linksObserverConfig: MutationObserverInit;

export const initLinksObserver = () => {
  linksObserverConfig = {
    childList: true,
    subtree: true,
  };
  linksObserver = new MutationObserver(linksObserverCallback);
};

let scheduled = false;
const linksObserverCallback: MutationCallback = () => {
  if (scheduled) return;
  scheduled = true;
  setTimeout(() => {
    scheduled = false;
    setCopyButtons(getExternalLinks());
    setEmailCopyButtons(getEmailLinks());
    setPropertyCopyButtons();
  }, 150);
};

export const runLinksObserver = () => {
  // Tippy page previews are mounted outside #app-container.
  linksObserver.observe(doc.body, linksObserverConfig);
};

export const stopLinksObserver = () => {
  linksObserver.disconnect();
};
