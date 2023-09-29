export const createSentenceInfo = ({
  meaning,
  formality,
  suggestions,
  more,
}) => {
  return `
    <div class="text_info_field">
      <h2> meaning </h2>
      <p class="highlighted">${meaning}</p>
    </div>
    <div class="text_info_field">
      <h2> formality </h2>
      <p class="highlighted">${formality}</p>
    </div>
    <div class="text_info_field">
      <h2> suggestions </h2>
      <p class="highlighted">${suggestions}</p>
    </div>
    <div class="text_info_field">
      <h2> more </h2>
      <p class="highlighted">${more}</p>
    </div>
  `;
};
