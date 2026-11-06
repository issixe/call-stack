// 1. Receive the agent ID, session ID, and selected answer ID and stage ID.
// 2. Load the session and its lesson.
// 3. Check that the session belongs to the agent,
//    is in progress, and the answer belongs to its current stage.
// 4. Use domain logic to:
//    - Calculate the selected answer's earned points.
//    - Add those points to cScore.
//    - Record the answer in the session history.
//    - Determine customer mood and the next stage based on cscore.
//    - Determine whether the lesson is complete / early fail.
// 5. Return updated session progress and either:
//    - The next customer response and answer options.
//    - An indication that the session has finished.

import { SubmitAnswerInputBoundary } from
    "./SubmitAnswerInputBoundary.js";
import { SubmitAnswerOutputData } from "./SubmitAnswerOutputData.js";

export class SubmitAnswerInteractor extends SubmitAnswerInputBoundary {
    constructor(sessionRepository, lessonRepository, moduleRepository, outputBoundary) {
        super();
        this.sessionRepository = sessionRepository;
        this.lessonRepository = lessonRepository;  // Dependency injection for repositories
        this.moduleRepository = moduleRepository;
        this.outputBoundary = outputBoundary;
    }

    async execute(inputData) {
        // find the session using session repository and inputData.sessionId
        const session = await this.sessionRepository.findById(inputData.sessionId);

        // validate user owenship of the session, sessions status and stageID.
        this.validateSubmission(session, inputData);

        // load the lesson using session.lessonId and lesson repo 
        const lesson = await this.lessonRepository.findById(session.lessonId);

        // Check inputData.answerId in the current stage. 
        this.findAnswer(lesson, session.stageId, inputData.answerId);

        // Find the answer in the lesson so we can calculate the score and update the session.
        const answer = this.findAnswer(lesson, session, inputData);

        // Calculate the answer's score and update user cScore 
        const answerScore = this.calculateEarnedScore(answer.score, lesson.moduleWeight);
        const module = await this.moduleRepository.findById(lesson.moduleId); // Load the module to get the weights 
        const earnedScore = this.calculateEarnedScore(answerScore, module.weight);

        // Update session history, customer mood, stage, and completion status.
        session.updateCScore(earnedScore);
        session.updateCustomerMood(); // Assuming this method is in session entity
        session.updateStage(); // Assuming this method is in session entity
        session.updateCompletionStatus();

        // Save the updated session 
        await this.sessionRepository.save(session);

        // Create customer response and answer options for the next stage if the session is still in progress.
        const isFinished = session.status !== "in_progress";

        let customerResponse = null;
        let answerOptions = [];

        if (!isFinished) {
            const nextStage = lesson.stages[session.stageId];

            if (!nextstage) {throw new Error("Next stage not found");}

            customerResponse = nextStage[customerResponse][customerMood];
            answerOptions = Object.entries(nextStage.answers).map(([answerId, answer]) => ({ //convert answer object to array of answer options (list)
                answerId,
                text: answer.text,
            }));
        }
        const outputData = new SubmitAnswerOutputData({
            sessionId: inputData.sessionId,
            cScore: session.cScore,
            earnedScore: earnedScore,
            status: session.status,
            stageId: session.stageId,
            customerMood: session.customerMood,
            customerResponse: this.customerResponse,
            answerOptions: this.answerOptions
        });

        // return output data and pass it to output boundary. 
        return this.outputBoundary.present(outputSata);
    }

    // Validate ownership, session status, and the submitted stage.
    validateSubmission(session, inputData) {
        if (!session) {
            throw new Error("Session not found");
        }
        if (session.userId !== inputData.userId) {
            throw new Error("User does not own this session");
        }
        if (session.status !== "in_progress") {
            throw new Error("Session is not in progress");
        }
        if (session.stageId !== inputData.stageId) {
            throw new Error("Session is not in the correct stage");
        }
    }

    // Validate and Find answer in the lesson 
    findAnswer(lesson, session, inputData) {
        if (!lesson) { throw new Error("Lesson not found"); }
        const stage = lesson.stages?.[session.stageId];
        if (!stage) { throw new Error("Stage not found"); }
        const answer = stage.answers[inputData.answerId];
        if (!answer) { throw new Error("Answer not found"); }
        return answer;
    }

    // Return the earnted score based on the answer score and the module weight.
    calculateEarnedScore(answerScore, moduleWeight) {
        let weightedScoreSum = 0;
        let weightSum = 0;
        for (const dimension of Object.keys(moduleWeight)) {
            const weight = moduleWeight[dimension];
            const score = answerScore[dimension] || 0;

            weightedScoreSum += score * weight;
            weightSum += weight;
        }
        if (weightSum !== 1) { throw new Error("Total weight must be equal to one"); } //NOTE: Not sure if this step is necessary 
        return weightedScoreSum;
    }


}
