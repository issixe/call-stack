import { lessonCompleteInputData } from '../../application/use_cases/lessonComplete/lessonCompleteInputData.js';
 
export function createLessonCompleteController({ lessonComplete }) {
    return async function lessonCompleteController(req, res, next) {
        const { agentId, sessionId } = req.params;
 
        if (!agentId || !sessionId) {
            return res.status(400).json({ error: 'agentId and sessionId are required' });
        }
 
        try {
            const inputData = new lessonCompleteInputData({ agentId, sessionId });
            const responseData = await lessonComplete.execute(inputData);
            return res.status(200).json(responseData);
        } catch (error) {
            return next(error);
        }
    };
}
 