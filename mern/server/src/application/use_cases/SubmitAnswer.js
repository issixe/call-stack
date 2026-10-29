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