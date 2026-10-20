import { logseq as PL } from "../package.json";
import { doc } from "./global";
import { clipboardIcon, checkIcon } from ".";

export const setCopyButtons = (links: HTMLAnchorElement[]) => {
  links.forEach((link) => {
    if (link.nextElementSibling?.classList.contains(`${PL.id}-button`)) return;

    const href = link.getAttribute("href");

    // check if there is a link
    if (!href) return;

    // create button
    const button = doc.createElement("button");
    // add styles
    button.classList.add(`${PL.id}-button`);
    // add icon
    button.innerHTML = clipboardIcon;

    button.addEventListener("click", async () => {
      try {
        await parent.navigator.clipboard.writeText(href);
        button.innerHTML = checkIcon;
        setTimeout(() => (button.innerHTML = clipboardIcon), 1000);
      } catch (e) {
        console.error("Error while copying a url", e);
      }
    });

    // add button
    link.insertAdjacentElement("afterend", button);
  });
};

export const setEmailCopyButtons = (links: HTMLAnchorElement[]) => {
  links.forEach((link) => {
    if (link.nextElementSibling?.classList.contains(`${PL.id}-button`)) return;

    // Property values have their own copy button, which prefers data-href.
    if (link.closest(".page-property-value")) return;

    const href = link.getAttribute("data-href") || link.getAttribute("href");
    if (!href || !href.startsWith("mailto:")) return;

    const email = href.slice("mailto:".length).split("?")[0];

    // create button
    const button = doc.createElement("button");
    // add styles
    button.classList.add(`${PL.id}-button`);
    // add icon
    button.innerHTML = clipboardIcon;

    button.addEventListener("click", async () => {
      try {
        await parent.navigator.clipboard.writeText(email);
        button.innerHTML = checkIcon;
        setTimeout(() => (button.innerHTML = clipboardIcon), 1000);
      } catch (e) {
        console.error("Error while copying an email address", e);
      }
    });

    // add button
    link.insertAdjacentElement("afterend", button);
  });
};

export const removeCopyButtons = () => {
  const buttons = [
    ...doc.querySelectorAll(`.${PL.id}-button`),
  ] as HTMLButtonElement[];
  buttons.forEach((button) => button.remove());
};
