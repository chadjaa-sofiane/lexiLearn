import { createWordInfo } from "../components/word_info.js";
import { createSentenceInfo } from "../components/sentence_info.js";
const inputForm = document.getElementById("input_form");
const loadingSvg = document.getElementById("loading_svg");
const resultContainer = document.getElementById("result_container");

const promptHandlers = {
  word: {
    type: "word",
    render: createWordInfo,
  },
  sentence: {
    type: "sentence",
    render: createSentenceInfo,
  },
};

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  loadingSvg.style.display = "block";

  const isWord = formProps.text_input.split(" ").length === 1;
  const promptHandler = isWord
    ? promptHandlers["word"]
    : promptHandlers["sentence"];

    chrome.runtime.sendMessage(
      {
        type: "fetch",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:3000/gpt",
        body: JSON.stringify({
          text: formProps.text_input,
          type: promptHandler.type,
        }),
      },
      (result) => {
        resultContainer.innerHTML = "";
        loadingSvg.style.display = "none";
        resultContainer.innerHTML = promptHandler.render(
          result.data.data,
          formProps.text_input
        );
      }
    );  
});
