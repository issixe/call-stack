// listModulesOutputData.js
// Output data for the "list modules" use case.
// A simple container holding the result: the list of modules.
// No logic, it just carries data from the interactor to the presenter.


export class listModulesOutputData {
    constructor({ modules }) {
        this.modules = modules;
    }
}