/**
 * Finds the optimal choice based on a set of conditions.
 *
 * @template T
 * @param {T} value - The value to evaluate against conditions.
 * @param {Array<{ conditions: (value: T) => boolean, optimal: any }>} conditions - An array of conditions and their corresponding optimal choices.
 * @param {any} defaultChoice - The default choice to return if no conditions match.
 * @returns {any} The optimal choice based on the first matching condition, or the default choice if no conditions match.
 */

const getOptimalChoise = (value, conditions, defaultChoice) => {
  let optimal = defaultChoice;

  for (let c of conditions) {
    if (c.conditions(value)) {
      optimal = c.optimal;
    }
  }

  return optimal;
};

export default getOptimalChoise
