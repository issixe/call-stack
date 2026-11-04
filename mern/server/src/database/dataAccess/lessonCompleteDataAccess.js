import { ObjectId } from 'mongodb';
import db from '../connection.js';
import { lessonCompleteDataAccess } from '../../application/use_cases/lessonComplete/lessonCompleteDataAccess.js';

export class MongoLessonCompleteDataAccess extends lessonCompleteDataAccess {
    async findSessionById(sessionId) {
        if (!ObjectId.isValid(sessionId)) {
            return null;
        }
        const session = await db.collection('sessions').findone(
            { _id: new ObjectId(sessionId) }
        );

        if (!session) {
            return null;
        }

        return {
            agentId: session.agentId?.toString(),
            sessionId: session._id.toString(),
            lessonId: session.lessonId.toString(),
            cScore: session.cScore,
            completed: session.completed
        };
    }

    async findAgentById(agentId) {
        if (!ObjectId.isValid(agentId)) {
            return null;
        }
        const user = await db.collection('users').findone(
            { _id: new ObjectId(userId) }
        );

        if (!user) {
            return null;
        }

        return {
            agentId: user._id.toString(),
            totalPoints: user.totalPoints,
            streak: user.streak,
            lastActivity: user.lastActivity,
            lessonScores: user.lessonScores
        };
    }

    async updateSession(session) {
        await db.collection('sessions').updateOne(
            { _id: new ObjectId(session.sessionId) },
            { $set: {
                completed: session.completed
            }}
        );
    }

    async updateAgent(agent) {
        await db.collection('users').updateOne(
            { _id: new ObjectId(agent.agentId) },
            { $set: {
                    totalPoints: agent.totalPoints,
                    streak: agent.streak,
                    lastActivity: agent.lastAcivitiy,
                    lessonScores: agent.lessonScores
            }}
        );
    }
}