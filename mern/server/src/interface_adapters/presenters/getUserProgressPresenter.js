import { getUserProgressOutputData } 
from '../../application/use_cases/getUserProgress/getUserProgressOutputData.js';
import { getUserProgressOutputBoundary } 
from '../../application/use_cases/getUserProgress/getUserProgressOutputBoundary.js';

export class getUserProgressPresenter extends getUserProgressOutputBoundary {
    async present(outputData) {
        return {
            agentId: outputData.agentId,
            streak: outputData.streak,
            totalPoints: outputData.totalPoints,
            completedModules: outputData.completedModules
        };
    }
}