// ListModules.js

// 1. Load available training modules from the module repository.
// 2. Return module summaries for display, such as title, description, status (completed / n/m lessons completed), and any other relevant metadata.
export class ListModules {
  constructor(moduleData) {
    this.moduleData = moduleData;
  }

  async execute() {
    const modules = await this.moduleData.findAll();

    return modules.map((module) => ({
      id: module.id,
      title: module.title,
      description: module.description,
      lessonReferences: module.lessonReferences,
    }));
  }
}