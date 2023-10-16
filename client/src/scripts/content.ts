import { getGPTResult } from "./api/getGPTResult";
const viewContainer = document.createElement("div");
viewContainer.style.position = "absolute";
viewContainer.classList.add("view_container");
const resultContainer = document.createElement("div");
resultContainer.classList.add("text_info_container");
viewContainer.appendChild(resultContainer);
// resultContainer.style.height = "auto";

let selected = false;
let text = "";
let x: number;
let y: number;

const element = document.createElement("div");
element.style.backgroundColor = "red";
element.style.position = "fixed";
element.style.width = "20px";
element.style.height = "20px";
element.style.cursor = "pointer";

document.addEventListener("mouseup", (e) => {
  x = e.clientX;
  y = e.clientY;
  element.style.top = `${y}px`;
  element.style.left = `${x}px`;
  if (selected) {
    document.body.appendChild(element);
  }
});
document.addEventListener("mousedown", () => {
  if (document.body.contains(element)) document.body.removeChild(element);
  if (document.body.contains(viewContainer))
    document.body.removeChild(viewContainer);
});

document.addEventListener("selectionchange", () => {
  const selection = window.getSelection();
  text = selection?.toString() || "";
  selected = !selection?.isCollapsed;
});

element.addEventListener("mousedown", (e) => {
  e.stopPropagation();
  viewContainer.style.top = `${y}px`;
  viewContainer.style.left = `${x}px`;
  document.body.appendChild(viewContainer);
  getGPTResult(resultContainer, text);
});
