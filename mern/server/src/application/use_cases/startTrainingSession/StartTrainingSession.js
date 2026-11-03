// 1. Receive the agent ID and selected lesson ID.
// 2. Load the lesson and check that it exists.
// 3. Use domain logic to create a session with:
//    - cScore: 0
//    - the lesson's starting stage
//    - the initial customer mood
//    - empty answer history
//    - status: "in_progress"
// 4. Save the new session.
// 5. Return the session ID, opening customer response,
//    and available answer options without their scores.