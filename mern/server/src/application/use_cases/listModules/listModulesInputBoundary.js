// listModulesInputBoundary.js
// Input boundary (interface) for the "list modules" use case.
// Defines the entry point the controller calls: execute(inputData).
// The interactor must extend this class and override execute.

export class listModulesInputBoundary {
    async execute(inputData) {
        throw new Error('Execute not implemented');
    }
}