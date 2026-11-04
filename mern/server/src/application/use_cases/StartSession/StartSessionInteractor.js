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

import { startSessionInputBoundary } from "./startSessionInputBoundary.js";
import { startSessionOutputData } from "./startSessionOutputData.js";
import { Session } from "../../enterprise/entities/session.js";

export class startSessionInteractor extends startSessionInputBoundary {
  constructor({ dataAccess, presenter }) {
    super();
    this.dataAccess = dataAccess;
    this.presenter = presenter;
  }

  async execute({ agentId, lessonId }) {
    // Check that the agent and lesson referenced actually exist
    if (!agentId) {
      throw new Error("Agent ID is required");
    }

    if (!lessonId) {
      throw new Error("Lesson ID is required");
    }

    const userProfile = await this.dataAccess.getUserById(agentId);

    if (!userProfile) {
      throw new Error(`User with ID ${agentId} not found`);
    }

    const lesson = await this.dataAccess.getLessonById(lessonId);

    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonId} not found`);
    }

    const session = new Session(
      agentId,
      lessonId,
      lesson.startingStage,
      lesson.initialMood,
    );

    const sessionId = await this.sessionAccess.saveNewSession(session);

    const outputData = new startSessionOutputData({ sessionId });

    return this.presenter.present(outputData);
  }
}
