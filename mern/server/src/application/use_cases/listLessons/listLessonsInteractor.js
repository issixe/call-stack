// 1. Receive the selected module ID.
// 2. Check that the module exists.
// 3. Load the lessons belonging to that module.
// 4. Return lesson title and progress information

export class ListLessons {
  constructor(moduleData , lessonData) {
    this.moduleData  = moduleData ;
    this.lessonData = lessonData;
  }

  async execute(moduleId) {
    if (!moduleId) {
      throw new Error("Module ID is required");
    }

    const module = await this.moduleData .findById(moduleId);

    if (!module) {
      throw new Error("Module not found");
    }

    const lessons = await this.lessonData.findByModuleId(moduleId);

    return lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      startingStage: lesson.startingStage,
      stages: lesson.stages,
    }));
  }
}