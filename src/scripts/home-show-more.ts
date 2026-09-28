document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest<HTMLButtonElement>(".home-show-more");
  const target = button?.dataset.expand;
  if (!target) return;

  const container = document.querySelector<HTMLElement>(target);
  if (!container) return;
  container.dataset.collapsed = "false";
  button.remove();
});
