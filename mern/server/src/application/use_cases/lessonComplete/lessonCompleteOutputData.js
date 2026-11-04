export class lessonCompleteOutputData {
    constructor({ agentId, sessionId, streak, sessionScore, totalPoints }) {
        this.agentId = agentId;
        this.sessionId = sessionId;
        this.streak = streak;
        this.sessionScore = sessionScore;
        this.totalPoints = totalPoints;
    }
}