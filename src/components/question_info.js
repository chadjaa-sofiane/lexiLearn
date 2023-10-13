export const createQuestionInfo = (
  { word, explanation, formality, other_suggestions, more },
  _
) => {
  const suggestionsList = other_suggestions
    .map(
      (suggestion) => `<li>
      <p class="highlighted"> ${suggestion.word} </p>
      <p class="highlighted"> ${suggestion.formality} </p>
    </li>`
    )
    .join(" ");

  return `
      <div class="text_info_field">
        <h2> word </h2>
        <p class="highlighted">${word}</p>
      </div>
      <div class="text_info_field">
        <h2> explanation </h2>
        <p class="highlighted">${explanation}</p>
      </div>
      <div class="text_info_field">
        <h2> formality </h2>
        <p class="highlighted">${formality}</p>
      </div>
      <div class="text_info_field">
        <h2> other suggestions </h2>
        <ul>${suggestionsList}</ul>
      </div>
      <div class="text_info_field">
        <h2> more </h2>
        <p class="highlighted">${more}</p>
      </div>
    `;
};
