import { ObjectId } from "mongodb";
import db from "../connection.js";
import { StartSessionDataAccess } from "../../application/use_cases/startSession/startSessionDataAccess.js";

export class MongoUserProgressDataAccess extends StartSessionDataAccess {
  async getUserById(agentId) {
    if (!ObjectId.isValid(agentId)) {
      return null;
    }
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(agentId) },
      //TODO: define projection to match existing user profile structure
    );

    if (!user) {
      return null;
    }
    return {
      user,
    };
  }

  async getLessonById(lessonId) {
    if (!ObjectId.isValid(lessonId)) {
      return null;
    }
    const lesson = await db.collection("lessons").findOne(
      { _id: new ObjectId(agentId) },
      //TODO: define projection to match existing lesson structure
    );

    if (!lesson) {
      return null;
    }
    return {
      lesson,
    };
  }

  async saveNewSession(session) {
    const result = await db.collection("sessions").insertOne({
      agentId: session.agentId,
      lessonId: session.lessonId,
      cScore: session.cScore,
      stage: session.stage,
      customerMood: session.customerMood,
      answerHistory: session.answerHistory,
      status: session.status,
    });
    return result.insertedId.toString();
  }
}
