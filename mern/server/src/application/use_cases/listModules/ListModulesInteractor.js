// ListModules.js

// 1. Load available training modules from the module repository.
// 2. Return module summaries for display, such as title, description, status (completed / n/m lessons completed), and any other relevant metadata.
// ListModulesInteractor.js
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