import { logseq as PL } from "../package.json";
import { doc } from "./global";
import { clipboardIcon, checkIcon } from ".";

const buttonClass = `${PL.id}-property-button`;

/** Prefer Logseq's canonical data-href over the sometimes incomplete href. */
function getPropertyValue(row: Element): string | null {
  const link = row.querySelector<HTMLAnchorElement>(
    'a[data-href^="mailto:"], a[href^="mailto:"], a[data-href^="https://"], a[data-href^="http://"], a[href^="https://"], a[href^="http://"]',
  );
  if (link) {
    const target = link.getAttribute("data-href") || link.getAttribute("href") || "";
    if (target.startsWith("mailto:")) {
      const email = target.slice(7).split("?")[0];
      if (email) return decodeURIComponent(email);
      return link.textContent?.trim() || null;
    }
    if (/^https?:\/\//.test(target)) return target;
  }

  // Also handle properties rendered as plain text rather than links.
  const text = row.textContent || "";
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (email) return email[0];
  const url = text.match(/https?:\/\/[^\s<>"')]+/i);
  return url?.[0] || null;
}

export function setPropertyCopyButtons() {
  doc.querySelectorAll(".page-property-value").forEach((row) => {
    if (row.querySelector(`.${buttonClass}`)) return;
    const value = getPropertyValue(row);
    if (!value) return;

    const button = doc.createElement("button");
    button.type = "button";
    button.className = buttonClass;
    button.title = "Copy property link";
    button.setAttribute("aria-label", "Copy property link");
    button.innerHTML = clipboardIcon;
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try {
        await parent.navigator.clipboard.writeText(getPropertyValue(row) || value);
        button.innerHTML = checkIcon;
        setTimeout(() => { if (button.isConnected) button.innerHTML = clipboardIcon; }, 1000);
      } catch (error) {
        console.error("Error copying property link", error);
      }
    });
    row.appendChild(button);
  });
}

export function removePropertyCopyButtons() {
  doc.querySelectorAll(`.${buttonClass}`).forEach((button) => button.remove());
}
