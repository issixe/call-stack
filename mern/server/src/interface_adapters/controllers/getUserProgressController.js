import { getUserProgressInputBoundary } from 
'../../application/use_cases/getUserProgress/getUserProgressInputBoundary.js';
import { getUserProgressInputData } from
'../../application/use_cases/getUserProgress/getUserProgressInputData.js';

export function createGetUserProgressController({ getUserProgress }) {
  return async function getUserProgressController(req, res, next) {
    const { agentId } = req.params;

    if (!agentId) {
      return res.status(400).json({ error: "Agent ID is required" });
    }

    try {
      const inputData = new getUserProgressInputData({ agentId });
      const responseData = await getUserProgress.execute(inputData);

      return res.status(200).json(responseData);
    } catch (error) {
      return next(error);
    }
  };
}