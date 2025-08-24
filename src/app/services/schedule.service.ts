import { AnimalModel, ScheduleModel } from "@/models";

export class ScheduleService {
  /**
   * Generate a caretaker's daily schedule
   */
  static async generateDailySchedule(caretakerId: string) {
    // today's date (ignoring time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // check if schedule already exists
    const existing = await ScheduleModel.findOne({ caretakerId, date: today });
    if (existing) {
      return existing; // don't duplicate
    }

    // find animals assigned to this caretaker
    const animals = await AnimalModel.find({ caretaker_id: caretakerId });
    if (!animals.length) {
      throw new Error("No animals assigned to caretaker");
    }

    // build tasks
    const tasks = animals.flatMap((animal) => [
      {
        animalId: animal._id,
        taskType: "feed",
        time: "09:00", // you could randomize or configure
      },
      {
        animalId: animal._id,
        taskType: "clean",
        time: "14:00",
      },
      {
        animalId: animal._id,
        taskType: "health_check",
        time: "17:00",
      },
    ]);

    // create schedule
    const schedule = await ScheduleModel.create({
      caretakerId,
      date: today,
      tasks,
    });

    return schedule;
  }

  /**
   * Get caretaker schedule for a specific date
   */
  static async getSchedule(params: { id: string; date?: string }) {
    const { id, date } = params;
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    const result = await ScheduleModel.findOne({
      caretakerId: id,
      date: targetDate,
    })
      .populate("tasks.animalId", "name category") // optional: include animal info
      .exec();

    return result;
  }
}
