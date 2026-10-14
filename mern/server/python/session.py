"""
Tracking and mapping the state of one agent's training session within a module
"""

import json
with open("modules/double_billing.json", "r") as f:
    module = json.load(f)

class Session:
    def __init__(self, module):
        
        self.module_id =module["module_id"]
        self.stage_id = module["starting_stage"]
        self.answer_scores = []  # List of history answer score earn by the agent
        self.cScore = 0.0  # Cumulative score for the session
        self.status = "in_progress" # Session status can be 'in_progress', 'completed', or 'failed'

    def update_cscore(self, answer_score):
        """
        Add the answer score to the session's history
         and update the culmulative score 
        """

        self.answer_scores.append(answer_score)
        self.cScore = sum(self.answer_scores) / len(self.answer_scores)  # Update cumulative score

    def set_stage(self, stage_id):
        """
        Update the current stage of the session 
        """
        self.stage_id = stage_id

    def end_session(self, status):
        """Update the session status to either 'completed' or 'failed'"""
        if status not in ["completed", "failed"]:
            raise ValueError("Status must be either 'completed' or 'failed'")
        self.status = status


if __name__ == "__main__":
    session = Session(module)

    session.update_cscore(70)
    print(session.cScore)  # Expected: 70.0

    session.update_cscore(80)
    print(session.cScore)  # Expected: 75.0

    session.update_cscore(90)
    print(session.cScore)  # Expected: 80.0

    print(session.module_id)
    print(session.stage_id)
