import { doc } from "./global";
import { setCopyButtons, setEmailCopyButtons } from "./copyButtons";
import { getEmailLinks, getExternalLinks } from "./utils";

let linksObserver: MutationObserver;
let linksObserverConfig: MutationObserverInit;

export const initLinksObserver = () => {
  linksObserverConfig = {
    childList: true,
    subtree: true,
  };
  linksObserver = new MutationObserver(linksObserverCallback);
};

const linksObserverCallback: MutationCallback = function (mutationsList) {
  for (let i = 0; i < mutationsList.length; i++) {
    const mutationItem = mutationsList[i];
    const addedNode = mutationItem.addedNodes[0] as HTMLElement;
    if (addedNode && addedNode.childNodes.length) {
      const extLinkList = getExternalLinks();
      const emailLinkList = getEmailLinks();

      if (extLinkList.length) {
        setCopyButtons(extLinkList);
      }

      if (emailLinkList.length) {
        setEmailCopyButtons(emailLinkList);
      }
    }
  }
};

export const runLinksObserver = () => {
  const appContainer = doc.getElementById("app-container");
  if (!appContainer) {
    return;
  }
  linksObserver.observe(appContainer, linksObserverConfig);
};

export const stopLinksObserver = () => {
  linksObserver.disconnect();
};
