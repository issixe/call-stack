/**
 * State of one training attempt. The caller loads and supplies scenario data;
 * this entity performs no file or database access.
 * The existing scenario schema still uses module_id and starting_stage.
 */
export class Session {
  constructor({
    id = null, // null until saved
    agentId,
    lessonId,
    stage,
    customerMood,
    cScore = 0,
    answerHistory = [],
    status = "in_progress",
  }) {
    this.id = id;
    this.agentId = agentId;
    this.lessonId = lessonId;
    this.stage = stage;
    this.customerMood = customerMood;
    this.cScore = cScore;
    this.answerHistory = answerHistory;
    this.status = status;
  }

  /** Record earned points. cScore is intentionally a total, not Python's mean. */
  updateCScore(answerScore) {
    if (!Number.isFinite(answerScore) || answerScore < 0 || answerScore > 100) {
      throw new RangeError(
        "Answer score must be a finite number between 0 and 100",
      );
    }
    this.answerScores.push(answerScore);
    this.cScore += answerScore;
  }

  setStage(stage) {
    this.stage = stage;
  }

  endSession(status) {
    if (status !== "completed" && status !== "failed") {
      throw new Error("Status must be either 'completed' or 'failed'");
    }
    this.status = status;
  }
}
