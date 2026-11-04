// 1. Receive the agent ID.
// 2. Load the agent's recorded training progress (in the agent profile).
// 3. Determine the current streak using domain rules
//    and the current date in the agreed timezone.
// 4. Return overall points, current streak,
//    and completed-lesson progress.
// 5. Do not award points or record a new completion.
import { getUserProgressInputBoundary } from './getUserProgressInputBoundary.js';
import { getUserProgressOutputData } from './getUserProgressOutputData.js';


export class getUserProgressInteractor extends getUserProgressInputBoundary {
    constructor ({ dataAccess, presenter }) {
        super();
        this.dataAccess = dataAccess;
        this.presenter = presenter;
    }

    async execute ({ agentId }) {
        if (!agentId) {
            throw new Error('Agent ID is required');
        }

        const userProfile = await this.dataAccess.getUserById(agentId);

        if (!userProfile) {
            throw new Error(`User with ID ${agentId} not found`);
        }

        const outputData = new getUserProgressOutputData({
            agentId: userProfile.agentId,
            streak: userProfile.streak,
            totalPoints: userProfile.totalPoints,
            completedModules: userProfile.completedModules
        });

        return this.presenter.present(outputData);
    }
}