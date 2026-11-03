// 1. Receive the selected module ID.
// 2. Check that the module exists.
// 3. Load the lessons belonging to that module.
// 4. Return lesson title and lesson information.
// 5. Do not start a lesson or modify progress.

export class listLessonsOutputData {
    constructor({ moduleId, lessons }) {
        this.moduleId = moduleId;
        this.lessons = lessons;
    }
}