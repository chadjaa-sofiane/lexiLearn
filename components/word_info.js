// const linkElement = document.createElement("link");
// linkElement.rel = "stylesheet";
// linkElement.href = "/components/word_info.css";

// const template = document.createElement("template");
// template.innerHTML = `
//   <div class="div">
//     <h1> my name is chadjaa sofiane </h1>
//   </div>
// `;

// class WordInfo extends HTMLElement {
//   constructor() {
//     super();
//     const shadow = this.attachShadow({ mode: "open" });
//     shadow.append(linkElement);
//     shadow.append(template.content.cloneNode(true));
//   }
// }
// customElements.define("word-info", WordInfo);

export const createWordInfo = ({
  definition,
  examples,
  correct_word,
  synonyms,
  usage,
}) => {
  const correctWord = correct_word
    ? `<div class="word_info_field">you mean: <i class="correct_word"> ${correct_word}* </i></div>`
    : "";

  const examplesList = examples
    .map((example) => `<li class="highlighted">${example}</li>`)
    .join(" ");
  const synonymsList = synonyms
    .map((synonym) => `<li class="highlighted">${synonym}</li>`)
    .join(" ");

  return `
  ${correctWord}
  <div class="word_info_field">
    <h2> definition </h2>
    <p class="highlighted">${definition}</p>
  </div>
  <div class="word_info_field">
    <h2> examples </h2>
    <ul>${examplesList}</ul>
  </div>
  <div class="word_info_field">
    <h2> synonyms </h2>
    <ul>${synonymsList}</ul>
  </div>
  <div class="word_info_field">
    <h2> usage </h2>
    <p class="highlighted">${usage}</p>
  </div>
`;
};
