import { lessonCompleteOutputBoundary } from '../../application/use_cases/lessonComplete/lessonCompleteOutputBoundary.js';

export class lessonCompletePresenter extends lessonCompleteOutputBoundary {
    async present(outputData) {
        return {
            agentId: outputData.agentId,
            sessionId: outputData.sessionId,
            streak: outputData.streak,
            totalPoints: outputData.totalPoints,
            completedModules: outputData.completedModules // not sure about this one, too many properties of similar names...
        };
    }
}