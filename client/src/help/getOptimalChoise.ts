/**
 * Finds the optimal choice based on a set of conditions.
 */

type Condition<T> = {
  conditions: (value: T) => boolean;
  optimal: T;
};

const getOptimalChoise = <V>(
  value: V,
  conditions: Condition<V>[],
  defaultChoice: V
) => {
  let optimal = defaultChoice;

  for (let c of conditions) {
    if (c.conditions(value)) {
      optimal = c.optimal;
    }
  }

  return optimal;
};

export default getOptimalChoise;
