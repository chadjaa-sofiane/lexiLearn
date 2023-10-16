import { getGPTResult } from "./api/getGPTResult.js";
const inputForm = document.getElementById("input_form");
const container = document.getElementById("container");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  getGPTResult(container, formProps.text_input);
});
