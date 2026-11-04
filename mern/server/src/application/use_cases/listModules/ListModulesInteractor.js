// ListModulesInteractor.js
// Business logic for the "list modules" use case.
// 1. Load all modules from the module data access.
// 2. Return each module's id, title, description and lessonReferences.
//
// Dependencies (injected through the constructor):
//  - moduleData: loads modules
//  - outputBoundary: receives the result

import { listModulesInputBoundary } from './listModulesInputBoundary.js';
import { listModulesOutputData } from './listModulesOutputData.js';

export class ListModulesInteractor extends listModulesInputBoundary {
    constructor({ moduleData, outputBoundary }) {
        super();

        this.moduleData = moduleData;
        this.outputBoundary = outputBoundary;
    }

    async execute() {
        const modules = await this.moduleData.findAll();

        const outputData = new listModulesOutputData({
            modules: modules.map((module) => ({
                id: module.id,
                title: module.title,
                description: module.description,
                lessonReferences: module.lessonReferences
            }))
        });

        return this.outputBoundary.present(outputData);
    }
}