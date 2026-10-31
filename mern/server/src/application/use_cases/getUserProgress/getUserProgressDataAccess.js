// 1. Receive the agent ID.
// 2. Load the agent's recorded training progress (in the agent profile).
// 3. Determine the current streak using domain rules
//    and the current date in the agreed timezone.
// 4. Return overall points, current streak,
//    and completed-lesson progress.
// 5. Do not award points or record a new completion.