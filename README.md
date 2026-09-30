# Call Stack

This project is a small MERN app for our GeneSys FTL Design Project

- A React frontend in `mern/client`
- An Express API in `mern/server`
- A MongoDB database connection 

## Project structure

```bash
call-stack/
├── .env.example
├── .gitignore
├── mern/
│   ├── client/
│   └── server/
└── README.md
```

## Prerequisites

Before you start, make sure you have:

- Git
- Node.js 18+ recommended
- npm
- A MongoDB Atlas connection string or a local MongoDB instance

## 1) Clone your fork or the main repo, and set up remotes

```bash
git clone https://github.com/issixe/call-stack.git
cd call-stack
```

## 2) Install dependencies

This is a Node project, so `npm install` reads the dependencies from each app's `package.json` automatically. 

Run this in each app folder:

```bash
cd mern/client
npm install

cd ../server
npm install
```

This installs the dependencies declared in each package automatically, including React/Vite for the frontend and Express/MongoDB for the backend.

## 3) Configure environment variables

This project expects the server to have access to these environment variables:

- `ATLAS_URI` - your MongoDB connection string
- `PORT` - the port for the Express API (default is `5050`)

There is a template file at [.env.example](.env.example). You can copy it to `config.env` and then point Node at that exact file when starting the server.

```bash
cp .env.example mern/server/config.env
```

Then update the copied file with your real values:

```env
ATLAS_URI=mongodb+srv://<username>:<password>@<cluster>.<projectId>.mongodb.net/employees?retryWrites=true&w=majority
PORT=5050
```

The app reads these values from `process.env`, and Node can load them automatically when the server starts with the env-file flag.

## 4) Start the backend

From the server folder:

```bash
cd mern/server
node --env-file=config.env server.js
```

The API will run on:

```bash
http://localhost:5050
```

## 5) Start the frontend

Open a new terminal and run:

```bash
cd mern/client
npm run dev
```

The frontend will usually open on:

```bash
http://localhost:5173
```

The Vite config proxies `/record` requests to the backend at `localhost:5050`, so the UI can talk to the API during development.

## 6) Verify the app is working

- Open the client in the browser at `http://localhost:5173`
- Confirm the API responds at `http://localhost:5050/record`
- Make sure your MongoDB database is reachable and the connection string is valid

## Common troubleshooting

### MongoDB connection errors

- Double-check `ATLAS_URI`
- Make sure your IP address is allowed in MongoDB Atlas if you are using Atlas
- Confirm the database name in the URI is correct

### Port issues

- If `PORT` is changed, update any local references accordingly
- The default backend port is `5050`

## Team workflow

1. Pull the latest changes
2. Run `npm install` in both app folders
3. Update your local `mern/server/config.env`
4. Start the server with `node --env-file=config.env server.js`
5. Start the client with `npm run dev`
6. Verify functionality before committing changes
