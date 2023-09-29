import { createWordInfo } from "../components/word_info.js";
const inputForm = document.getElementById("input_form");
const loadingSvg = document.getElementById("loading_svg");
const resultContainer = document.getElementById("result_container");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  loadingSvg.style.display = "block";

  chrome.runtime.sendMessage(
    {
      type: "fetch",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:3000/gpt/word",
      body: JSON.stringify({
        word: formProps.text_input,
      }),
    },
    (result) => {
      resultContainer.innerHTML = "";
      loadingSvg.style.display = "none";
      resultContainer.innerHTML = createWordInfo(result.data.data, formProps.text_input);
    }
  );
});
