import { ObjectId } from 'mongodb';
import db from '../connection.js';
import { getUserProgressDataAccess } from '../../application/use_cases/getUserProgress/getUserProgressDataAccess.js';

export class MongoUserProgressDataAccess extends getUserProgressDataAccess {
    async getUserById(agentId) {
        if (!ObjectId.isValid(agentId)) {
            return null;
        }
        const user = await db.collection('users').findOne(
            { _id: new ObjectId(agentId) }
            //TODO: define projection to match existing user profile structure
        );

        if (!user) {
            return null;
        }
        return {
            agentId: user._id.toString(),
            totalPoints: user.totalPoints,
            completedModules: user.completedModules,
            streak: user.streak
        }

    }
}