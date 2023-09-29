import { createWordInfo } from "../components/word_info.js";
import { createSentenceInfo } from "../components/sentence_info.js";
const inputForm = document.getElementById("input_form");
const loadingSvg = document.getElementById("loading_svg");
const resultContainer = document.getElementById("result_container");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  loadingSvg.style.display = "block";
  if (formProps.text_input.split(" ").length === 1) {
    chrome.runtime.sendMessage(
      {
        type: "fetch",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:3000/gpt",
        body: JSON.stringify({
          text: formProps.text_input,
          type: "word",
        }),
      },
      (result) => {
        resultContainer.innerHTML = "";
        loadingSvg.style.display = "none";
        resultContainer.innerHTML = createWordInfo(
          result.data.data,
          formProps.text_input
        );
      }
    );
  } else {
    chrome.runtime.sendMessage(
      {
        type: "fetch",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:3000/gpt",
        body: JSON.stringify({
          text: formProps.text_input,
          type: "sentence",
        }),
      },
      (result) => {
        resultContainer.innerHTML = "";
        loadingSvg.style.display = "none";
        resultContainer.innerHTML = createSentenceInfo(result.data.data);
      }
    );
  }
});
