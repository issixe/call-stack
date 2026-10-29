/** Default weights for the five answer assessment dimensions. */
export const DEFAULT_WEIGHTS = Object.freeze({
  compliance: 0.20,
  process: 0.20,
  communication: 0.20,
  efficiency: 0.20,
  outcome: 0.20,
});

/** Calculate earned points from dimension scores and matching weights. */
export function calculateScore(response, weights = DEFAULT_WEIGHTS) {
  // Preserve Python's optional None behavior for explicit null callers.
  weights ??= DEFAULT_WEIGHTS;
  if (!response || typeof response !== "object" || Array.isArray(response) ||
      typeof weights !== "object" || Array.isArray(weights)) {
    throw new TypeError("Scores and weights must be objects");
  }
  const dimensions = Object.keys(weights);
  const values = Object.values(weights);
  if (values.some(weight => !Number.isFinite(weight))) {
    throw new TypeError("Weights must be finite numbers");
  }
  if (Math.abs(values.reduce((sum, weight) => sum + weight, 0) - 1) > 1e-9) {
    throw new Error("Weights must add up to 1.0");
  }
  if (Object.keys(response).length !== dimensions.length ||
      dimensions.some(dimension => !Object.hasOwn(response, dimension))) {
    throw new Error("Response must contain all scoring dimensions");
  }
  if (Object.values(response).some(score =>
    !Number.isFinite(score) || score < 0 || score > 100)) {
    throw new RangeError("Dimension scores must be finite numbers between 0 and 100");
  }
  if (values.some(weight => weight < 0)) {
    throw new RangeError("Weights cannot be negative");
  }
  return dimensions.reduce((sum, dimension) =>
    sum + response[dimension] * weights[dimension], 0);
}
