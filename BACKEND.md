# Backend 

## Backend structure 
```text
mern/server/
├── server.js
├── package.json
├── scripts/
│   └── seed.js
└── src/
    ├── domain/
    │   ├── entities/
    │   │   ├── Module.js
    │   │   ├── Lesson.js
    │   │   ├── Session.js
    │   │   └── AgentProfile.js
    │   └── services/
    │       ├── scoring.js
    │       └── streak.js
    ├── application/
    │   ├── use_cases/
    │   │   ├── ListModules.js
    │   │   ├── ListLessons.js
    │   │   ├── StartTrainingSession.js
    │   │   ├── SubmitAnswer.js
    │   │   ├── GetSessionResults.js
    │   │   └── GetAgentProgress.js
    │   └── ports/
    │       ├── ModuleRepository.js
    │       ├── LessonRepository.js
    │       ├── SessionRepository.js
    │       └── AgentProfileRepository.js
    ├── interfaces/
    │   └── http/
    │       ├── routes/
    │       │   ├── moduleRoutes.js
    │       │   ├── lessonRoutes.js
    │       │   ├── userRoutes.js
    │       │   ├── sessionRoutes.js
    │       │   └── agentProgressRoutes.js
    │       ├── controllers/
    │       │   ├── moduleController.js
    │       │   ├── lessonController.js
    │       │   ├── sessionController.js
    │       │   └── agentProgressController.js
    │       └── middleware/
    │           └── errorHandler.js
    └── infrastructure/
        └── database/
            ├── connection.js
            ├── repositories/
            │   ├── MongoModuleRepository.js
            │   ├── MongoLessonRepository.js
            │   ├── MongoSessionRepository.js
            │   └── MongoAgentProfileRepository.js
            └── seeds/
                └── seedData.js
```

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
| Agent profile | Information about an agent, including their identity and training progress: overall points, daily streak, and completed lessons.|

## Use Cases 

Operations that accomplish specific application goals by coordinating domain logic

| Use cases | What it does |
|---|---|
| ListModules | Show the available training modules.|
|ListLessons | Show the lessons within a selected module. |
| StartTrainingSession | Start an agent’s attempt at a lesson with cScore = 0 and its starting stage; returns the opening customer response and available answers.|
| SubmitAnswer | Process a selected answer, update points and conversation progress (returns the next customer answer), and finish the session when appropriat|
| GetSessionResult | Retrieve the session’s score and answer history. | 
| GetAgentProgress | view day streak and overall points| 

## Domain entities 
|Entity|Data|
|---|---|
|Module|ID, title, description, lesson references|
|Lesson|ID, title, starting stage, stages, customer responses, answer options and their scores|
|Session|Agent ID, lesson ID, current stage, mood, cScore, answer history, status|
|AgentProfile|Agent identity, overall points, completed lessons, streak information| 

## Domain service 
|service file | what does it do|
|---|---|
|scoring|Validate scoring weights and calculate points for an answer|
|streak|Calculate streak changes from lesson-completion dates|

## Components responsibility 
|Component|Job|
|---|---|
|Route|Defines an HTTP method and URL, such as POST /sessions, and directs matching requests to a controller.|
|Controller|Handles HTTP communication: reads and validates request input, calls a use case, and converts its result into an HTTP response.|
|Use case|Performs one application operation, such as starting a session. Coordinates domain behavior and repository calls to complete the operation|
|Domain|Defines business concepts and rules. Contains entities such as Session and rules such as scoring, progression, and streak calculation. Works independently of HTTP and databases.|
|Repository contract|Defines the data-access operations a use case needs, such as findById() and save(), without specifying a database technology.|
|repository inplementation|Implements that contract using a storage technology such as MongoDB. Runs database queries and translates stored documents into application/domain data and back.|