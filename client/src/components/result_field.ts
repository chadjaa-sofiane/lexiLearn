export const createResultField = () => {
  // adding the css style
  const resultField = document.createElement("div");
  resultField.classList.add("result_field");

  const loader = document.createElement("div");
  loader.classList.add("loader");

  const loadingSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  loadingSvg.id = "loading_svg";
  loadingSvg.classList.add("circular-loader");
  loadingSvg.setAttribute("viewBox", "25 25 50 50");

  const loaderPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  loaderPath.classList.add("loader-path");
  loaderPath.setAttribute("cx", "50");
  loaderPath.setAttribute("cy", "50");
  loaderPath.setAttribute("r", "20");
  loaderPath.setAttribute("fill", "none");
  loaderPath.setAttribute("stroke", "#70c542");
  loaderPath.setAttribute("stroke-width", "2");

  loadingSvg.appendChild(loaderPath);
  loader.appendChild(loadingSvg);

  const textInfoContainer = document.createElement("div");
  textInfoContainer.classList.add("text_info_container");
  textInfoContainer.id = "result_container";

  resultField.appendChild(loader);
  resultField.appendChild(textInfoContainer);

  return [resultField, loadingSvg];
};
