# Go Game

A simple app to play [Go](<https://en.wikipedia.org/wiki/Go_(game)>) with.

## Local Development

You need [Node.js](https://nodejs.org/en/) installed on your system, as well as `npm`.

### Installation

First, install the frontend.

```bash
cd client
cp .env.local.example .env.local
npm i
```

Then add e.g. `http://localhost:5000` to the `VITE_API_URL` environment variable.

Then, install the backend.

```bash
cd server
cp .env.example .env
cp .env.example .env.test
npm i
```

and add the following environment variables.

```py
PORT=5000
CLIENT_URL="http://127.0.0.1:5173"
DATABASE_URL="file:./dev.db"
```

Note that the `PORT` environment variable should match the port on the `VITE_API_URL` in your `client/.env.local`.

Finally, you should run `npx prisma generate`.

### Daily Development

Launch both frontend and backend development servers by running `npm run dev` on both `client` and `server` folder.

You can format your code with [Prettier](https://prettier.io/) by running `npm run prettier` (both on the `client` and `server` folder).

It is recommended to use a modern IDE like [VSCode](https://code.visualstudio.com/).

## Credits

The idea came from a wonderful video by Sebastian Lague: [Coding Adventure: Chess AI](https://youtu.be/U4ogK0MIzqk)

The rules logic and its implementation is mostly inspired by [duckpunch/godash](https://github.com/duckpunch/godash).
