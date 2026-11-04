import { lessonCompleteInputBoundary } from './lessonCompleteInputBoundary.js';
import { lessonCompleteOutputData } from './lessonCompleteOutputData.js';

export class lessonCompleteInteractor extends lessonCompleteInputBoundary {
    constructor({ dataAccess, presenter }){
        super();
        this.dataAccess = dataAccess;
        this.presenter = presenter;
    }

    async execute ({ agentId, sessionId }) {
        if (!agentId || !sessionId) {
            throw new Error('agentId and sessionId are required');
        }

        // load session
        const session = await this.dataAccess.findSessionById(sessionId);
        if (!session) {
            throw new Error('session not found');
        }
        if (session.agentId != agentId) {
            throw new Error('session does not belong to this agent');
        }
        const sessionScore = session.cScore;

        // load agent
        const agent = await this.dataAccess.findAgentById(agentId);
        if (!agent) {
            throw new Error('agent not found');
        }

        // update streak and points
        let streak = agent.streak || 0;
        const today = new Date().toLocaleDateString('en-CA'); // date in YYYY-MM-DD format
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-CA');

        if (agent.lastActivity == yesterday) {
            agent.streak += 1;
        }
        else if (agent.lastActivity != today){
            agent.streak = 1;
        }

        const prevScore = agent.lessonScores[session.sessionId] ?? 0;
        agent.totalPoints += (session.cScore - prevScore);
        agent.lessonScores[session.sessionId] = session.cScore;
        agent.lastActivity = today;
        session.completed = true;

        await this.dataAccess.updateSession(session);
        await this.dataAccess.updateAgent(agent);

        const outputData = new lessonCompleteOutputData({
            agentId: agent.agentId,
            sessionId: session.sessionId,
            streak: agent.streak,
            sessionScore: session.cScore,
            totalPoints: agent.totalPoints
        });

        return this.presenter.present(outputData);
    }
}