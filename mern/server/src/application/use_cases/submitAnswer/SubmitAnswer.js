// 1. Receive the agent ID, session ID, and selected answer ID.
// 2. Load the session and its lesson.
// 3. Check that the session belongs to the agent,
//    is in progress, and the answer belongs to its current stage.
// 4. Use domain logic to:
//    - Calculate the selected answer's earned points.
//    - Add those points to cScore.
//    - Record the answer in the session history.
//    - Determine customer mood and the next stage based on cscore.
//    - Determine whether the lesson is complete / early fail.
// 5. If the lesson is complete, coordinate updating the agent's
//    daily streak and overall points according to agreed rules.
// 6. Save the changes, ensuring retries cannot award points twice.
// 7. Return updated session progress and either:
//    - The next customer response and answer options.
//    - An indication that the session has finished.

// Scoring code below, does not actually belong in this file but does in this use case

/** Default weights for the five answer assessment dimensions. */
export const DEFAULT_WEIGHTS = Object.freeze({
  compliance: 0.2,
  process: 0.2,
  communication: 0.2,
  efficiency: 0.2,
  outcome: 0.2,
});

/** Calculate earned points from dimension scores and matching weights. */
export function calculateScore(response, weights = DEFAULT_WEIGHTS) {
  // Preserve Python's optional None behavior for explicit null callers.
  weights ??= DEFAULT_WEIGHTS;
  if (
    !response ||
    typeof response !== "object" ||
    Array.isArray(response) ||
    typeof weights !== "object" ||
    Array.isArray(weights)
  ) {
    throw new TypeError("Scores and weights must be objects");
  }
  const dimensions = Object.keys(weights);
  const values = Object.values(weights);
  if (values.some((weight) => !Number.isFinite(weight))) {
    throw new TypeError("Weights must be finite numbers");
  }
  if (Math.abs(values.reduce((sum, weight) => sum + weight, 0) - 1) > 1e-9) {
    throw new Error("Weights must add up to 1.0");
  }
  if (
    Object.keys(response).length !== dimensions.length ||
    dimensions.some((dimension) => !Object.hasOwn(response, dimension))
  ) {
    throw new Error("Response must contain all scoring dimensions");
  }
  if (
    Object.values(response).some(
      (score) => !Number.isFinite(score) || score < 0 || score > 100,
    )
  ) {
    throw new RangeError(
      "Dimension scores must be finite numbers between 0 and 100",
    );
  }
  if (values.some((weight) => weight < 0)) {
    throw new RangeError("Weights cannot be negative");
  }
  return dimensions.reduce(
    (sum, dimension) => sum + response[dimension] * weights[dimension],
    0,
  );
}
