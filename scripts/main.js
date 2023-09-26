const inputForm = document.getElementById("input_form");
const loadingSvg = document.getElementById("loading_svg");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  loadingSvg.style.visibility = "visible";

  chrome.runtime.sendMessage(
    {
      type: "fetch",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:3000/gpt",
      body: JSON.stringify({
        word: formProps.text_input,
      }),
    },
    (result) => {
      console.log(result);
      loadingSvg.style.visibility = "hidden";
    }
  );
});
