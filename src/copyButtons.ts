import { logseq as PL } from "../package.json";
import { doc } from "./global";
import { clipboardIcon, checkIcon } from ".";

export const setCopyButtons = (links: HTMLAnchorElement[]) => {
  links.forEach((link) => {
    if (link.querySelector(`.${PL.id}-button`) !== null) return

    const href = link.getAttribute("href");

    // check if there is a link
    if (!href) return;

    // create button
    const button = doc.createElement("button");
    // add styles
    button.classList.add(`${PL.id}-button`);
    // add icon
    button.innerHTML = clipboardIcon;

    button.addEventListener("click", async e => {
      e.preventDefault()
      try {
        await parent.navigator.clipboard.writeText(href);
        button.innerHTML = checkIcon;
        setTimeout(() => (button.innerHTML = clipboardIcon), 1000);
      } catch (e) {
        console.error("Error while copying a url", e);
      }
    });

    // add button
    link.appendChild(button);
  });
};

export const removeCopyButtons = () => {
  const buttons = [
    ...doc.querySelectorAll(`.${PL.id}-button`),
  ] as HTMLButtonElement[];
  buttons.forEach((button) => button.remove());
};
