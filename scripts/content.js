let selected = false;

const element = document.createElement("div");
element.style.backgroundColor = "red";
element.style.position = "fixed";
element.style.width = "20px";
element.style.height = "20px";
element.style.cursor = "pointer";

document.addEventListener("mouseup", (e) => {
  if (document.body.contains(element)) document.body.removeChild(element);
  element.style.top = `${e.clientY}px`;
  element.style.left = `${e.clientX}px`;
  if (selected) {
    document.body.appendChild(element);
  }
});
document.addEventListener("mousedown", () => {
  if (document.body.contains(element)) document.body.removeChild(element);
});

document.addEventListener("selectionchange", (e) => {
  const selection = window.getSelection();
  const text = selection.toString();
  selected = !selection.isCollapsed;
});
