// listLessonsOutputBoundary.js
// Output boundary (interface) for the "list lessons" use case.
// Defines how the interactor sends results out: present(outputData).
// The presenter must extend this class and override present.

export class listLessonsOutputBoundary {
    async present(outputData) {
        throw new Error('Present not implemented');
    }
}