import { getGPTResult } from "./api/getGPTResult";
const viewContainer = document.createElement("div");
viewContainer.style.position = "fixed";
viewContainer.classList.add("view_container");

const resultContainer = document.createElement("div");
resultContainer.classList.add("text_info_container");
viewContainer.appendChild(resultContainer);

const wordElement = document.createElement("div");
wordElement.style.fontWeight = "bold";
wordElement.style.fontSize = "1.4em";

let selected = false;
let open = false;
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
  if (selected && !open) {
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
  open = true;
  resultContainer.innerHTML = "";
  wordElement.innerHTML = text;
  resultContainer.appendChild(wordElement);
  viewContainer.style.top = `${y - 200}px`;
  viewContainer.style.left = `${x + 40}px`;
  document.body.appendChild(viewContainer);
  getGPTResult(resultContainer, text);
});

let isDragging = false;
let initialX: number;
let initialY: number;

viewContainer.addEventListener("mousedown", (e) => {
  e.stopPropagation();
  isDragging = true;
  initialX = e.clientX - viewContainer.getBoundingClientRect().left;
  initialY = e.clientY - viewContainer.getBoundingClientRect().top;
  viewContainer.style.cursor = "grabbing";
  viewContainer.style.border = "2px solid blue"
});

viewContainer.addEventListener("mouseup", () => {
  viewContainer.style.border = "none"
  isDragging = false;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    e.preventDefault();
    viewContainer.style.left = e.clientX - initialX + "px";
    viewContainer.style.top = e.clientY - initialY + "px";
  }
});
