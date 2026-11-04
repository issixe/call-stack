// listLessonsInteractor.js
// Business logic for the "list lessons" use case.
// 1. Receive the selected module ID.
// 2. Check that the module exists.
// 3. Load the lessons belonging to that module.
// 4. Return each lesson's id, title, startingStage and stages.
// Dependencies 
//  - moduleData: looks up modules
//  - lessonData: looks up lessons
//  - outputBoundary: receives the result

import { listLessonsInputBoundary } from './listLessonsInputBoundary.js';
import { listLessonsOutputData } from './listLessonsOutputData.js';

export class listLessonsInteractor extends listLessonsInputBoundary {
    constructor({ moduleData, lessonData, outputBoundary }) {
        super();

        this.moduleData = moduleData;
        this.lessonData = lessonData;
        this.outputBoundary = outputBoundary;
    }

    async execute({ moduleId }) {
        if (!moduleId) {
            throw new Error('Module ID is required');
        }

        const module = await this.moduleData.findById(moduleId);

        if (!module) {
            throw new Error('Module not found');
        }

        const lessons = await this.lessonData.findByModuleId(moduleId);

        const outputData = new listLessonsOutputData({
            moduleId,
            lessons: lessons.map((lesson) => ({
                id: lesson.id,
                title: lesson.title,
                startingStage: lesson.startingStage,
                stages: lesson.stages
            }))
        });

        return this.outputBoundary.present(outputData);
    }
}