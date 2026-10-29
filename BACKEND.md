# Backend 

## Vocabulary 

|Concept|Definition|
|----|----|
| Module | A training module can contain several lesson|
| Lesson |One lesson is one conversation of agent & customer |
| Answer | Agent’s answer among different given option to reply to the customer |
| Customer Response | Customer’s response / text to the agent (aka player) |
| Stage | One step in a lesson’s conversation, containing customer dialogue and available agent answers.|
| Session | One agent’s attempt at a lesson, tracking their current stage, selected answers, score, mood, and status.|
| Agent | The person who completing the training module |

## Use Cases 

Operations that accomplish specific application goals by coordinating domain logic

| Use cases | What it does |
|---|---|
| ListModules | Show the available training modules.|
|ListLessons | Show the lessons within a selected module. |
| StartTrainingSession | Start an agent’s attempt at a lesson with cScore = 0 and its starting stage; returns the opening customer response and available answers.|
| SubmitAnswer | Process a selected answer, update points and conversation progress (returns the next customer answer), and finish the session when appropriat|
| GetSessionResult | Retrieve the session’s score and answer history. | 
| GetAgentProgress | view day streak and overall points / performance| 

