const inputForm = document.getElementById("input_form");

const wait = async (time = 2000) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

inputForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log("wait...");
  await wait(4000);
  console.log(formProps["text_input"]);
});
