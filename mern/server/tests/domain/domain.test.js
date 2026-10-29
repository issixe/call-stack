import test from "node:test";
import assert from "node:assert/strict";
import { calculateScore, DEFAULT_WEIGHTS } from "../../src/domain/services/scoring.js";
import { Session } from "../../src/domain/entities/Session.js";

const scores = { compliance: 100, process: 90, communication: 95, efficiency: 90, outcome: 85 };

test("scoring preserves Python fixtures and supports custom weights", () => {
  assert.equal(calculateScore(scores), 92);
  assert.equal(calculateScore(scores, null), 92);
  assert.equal(calculateScore({ compliance: 70, process: 40, communication: 30, efficiency: 50, outcome: 20 }), 42);
  assert.equal(calculateScore(scores, { compliance: 1, process: 0, communication: 0, efficiency: 0, outcome: 0 }), 100);
});

test("scoring rejects invalid totals, keys, ranges and negative weights", () => {
  assert.throws(() => calculateScore(scores, { ...DEFAULT_WEIGHTS, outcome: 0.3 }));
  assert.throws(() => calculateScore({ ...scores, extra: 10 }));
  assert.throws(() => calculateScore({ compliance: 10 }));
  assert.throws(() => calculateScore({ ...scores, outcome: 101 }));
  assert.throws(() => calculateScore(scores, { ...DEFAULT_WEIGHTS, outcome: -0.2, compliance: 0.6 }));
  for (const invalid of [NaN, Infinity, "90", -1]) {
    assert.throws(() => calculateScore({ ...scores, outcome: invalid }));
  }
});

test("session starts at zero and accumulates points instead of averaging", () => {
  const session = new Session({ module_id: "double_billing", starting_stage: "initial complaint" });
  assert.equal(session.moduleId, "double_billing");
  assert.equal(session.stageId, "initial complaint");
  assert.equal(session.status, "in_progress");
  assert.equal(session.cScore, 0);
  for (const score of [70, 80, 90]) session.updateCScore(score);
  assert.equal(session.cScore, 240);
  assert.deepEqual(session.answerScores, [70, 80, 90]);
  assert.throws(() => session.updateCScore(NaN));
  assert.equal(session.cScore, 240);
  session.setStage("investigation");
  assert.equal(session.stageId, "investigation");
  assert.throws(() => session.endSession("unknown"));
  assert.equal(session.status, "in_progress");
  session.endSession("completed");
  assert.equal(session.status, "completed");
  const failed = new Session({ module_id: "double_billing", starting_stage: "initial complaint" });
  failed.endSession("failed");
  assert.equal(failed.status, "failed");
});
