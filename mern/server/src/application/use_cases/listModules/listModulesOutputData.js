// 1. Load available training modules from the module repository.
// 2. Return module summaries for display.
// 3. Include the module title, description,
//    and references to its lessons.
// 4. Do not start a lesson or modify agent progress.

export class listModulesOutputData {
    constructor({ modules }) {
        this.modules = modules;
    }
}