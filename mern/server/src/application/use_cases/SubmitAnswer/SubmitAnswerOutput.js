export class SubmitAnswerOutputData {
    constructor({
        sessionId,
        cScore,
        earnedScore,
        status,
        stageId,
        customerMood,
        customerResponse,
        answerOptions,
    }) {
        this.sessionId = sessionId;
        this.cScore = cScore;
        this.earnedScore = earnedScore;
        this.status = status;
        this.isFinished = status !== "in_progress";
        this.stageId = stageId;
        this.customerMood = customerMood;
        this.customerResponse = customerResponse;
        this.answerOptions = answerOptions;
    }
}