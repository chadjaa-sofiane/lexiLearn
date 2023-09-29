export const createWordInfo = (
  { definition, examples, correct_word, synonyms, usage },
  text_input
) => {
  const correctWord =
    correct_word !== text_input
      ? `<p class="correct_text_field">you mean: <span class="correct_word"> ${correct_word} </span></p>`
      : "";

  const examplesList = examples
    .map((example) => `<li class="highlighted">${example}</li>`)
    .join(" ");
  const synonymsList = synonyms
    .map((synonym) => `<li class="highlighted">${synonym}</li>`)
    .join(" ");

  return `
  ${correctWord}
  <div class="text_info_field">
    <h2> definition </h2>
    <p class="highlighted">${definition}</p>
  </div>
  <div class="text_info_field">
    <h2> examples </h2>
    <ul>${examplesList}</ul>
  </div>
  <div class="text_info_field">
    <h2> synonyms </h2>
    <ul>${synonymsList}</ul>
  </div>
  <div class="text_info_field">
    <h2> usage </h2>
    <p class="highlighted">${usage}</p>
  </div>
`;
};
