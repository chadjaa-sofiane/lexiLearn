const resultContainer = document.createElement("div");
resultContainer.style.position = "fixed";
resultContainer.style.backgroundColor = "blue";
resultContainer.style.width = "40px";
resultContainer.style.height = "40px";
console.log(getGPTResult);

let selected = false;
let text = "";
let x;
let y;

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
  if (document.body.contains(resultContainer))
    document.body.removeChild(resultContainer);
});

document.addEventListener("selectionchange", (e) => {
  const selection = window.getSelection();
  text = selection.toString();
  selected = !selection.isCollapsed;
});

element.addEventListener("mousedown", (e) => {
  e.stopPropagation();
  resultContainer.style.top = `${y}px`;
  resultContainer.style.left = `${x}px`;
  document.body.appendChild(resultContainer);
  getGPTResult(resultContainer, text);
});
