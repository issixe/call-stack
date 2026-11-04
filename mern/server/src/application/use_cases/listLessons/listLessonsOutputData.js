// listLessonsOutputData.js
// Output data for the "list lessons" use case.
// A simple container holding the result: the moduleId and its lessons.
// No logic, it just carries data from the interactor to the presenter.

export class listLessonsOutputData {
    constructor({ moduleId, lessons }) {
        this.moduleId = moduleId;
        this.lessons = lessons;
    }
}