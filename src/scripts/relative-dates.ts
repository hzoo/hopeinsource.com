import { formatEpisodeRelativeDate } from "@/lib/dates";

function updateRelativeDates() {
  const relativeDateNodes = document.querySelectorAll<HTMLElement>("[data-relative-date]");

  relativeDateNodes.forEach((node) => {
    const dateValue = node.dataset.relativeDate;
    if (!dateValue) return;

    const date = new Date(`${dateValue}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) return;

    node.textContent = formatEpisodeRelativeDate(date);
  });
}

document.addEventListener("astro:page-load", updateRelativeDates);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateRelativeDates, { once: true });
} else {
  updateRelativeDates();
}
