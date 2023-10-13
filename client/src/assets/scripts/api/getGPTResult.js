import { createWordInfo } from "../../components/word_info.js";
import { createSentenceInfo } from "../../components/sentence_info.js";
import { createQuestionInfo } from "../../components/question_info.js";
import { createResultField } from "../../components/result_field.js";
import getOptimalChoise from "../../help/getOptimalChoise.js";

const promptHandlers = {
  word: {
    type: "word",
    render: createWordInfo,
  },
  sentence: {
    type: "sentence",
    render: createSentenceInfo,
  },
  question: {
    type: "question",
    render: createQuestionInfo,
  },
};

export const getGPTResult = (container, textInupt) => {
  const [resultField, loadingSvg] = createResultField();
  container.appendChild(resultField);

  loadingSvg.style.display = "block";

  const type = getOptimalChoise(
    textInupt,
    [
      {
        conditions: (text) => text.split(" ").length === 1,
        optimal: "word",
      },
      {
        conditions: (text) => text.includes("?"),
        optimal: "question",
      },
    ],
    "sentence"
  );

  const promptHandler = promptHandlers[type];

  chrome.runtime.sendMessage(
    {
      type: "fetch",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:3000/gpt",
      body: JSON.stringify({
        text: textInupt,
        type: promptHandler.type,
      }),
    },
    (result) => {
      resultField.innerHTML = "";
      loadingSvg.style.display = "none";
      resultField.innerHTML = promptHandler.render(result.data.data, textInupt);
    }
  );
};
