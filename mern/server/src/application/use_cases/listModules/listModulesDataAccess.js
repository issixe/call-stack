// listModulesDataAccess.js
// Data access interface for the "list modules" use case.
// Defines what the interactor needs from the data layer: findAll().
// Implementations must extend this class and override findAll.

export class listModulesDataAccess {
    async findAll() {
        throw new Error('findAll not implemented');
    }
}