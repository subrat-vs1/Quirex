# Quirex

Quirex is a three-zone MERN stack real estate platform with a responsive React + Tailwind CSS frontend and an Express + MongoDB backend for property discovery, administration, and purchase tracking.

It is designed for practical full-stack learning and portfolio-ready demonstration of role-based workflows across General, Admin, and User experiences.

## Tech Stack

- Frontend: React 19, Vite 7, Tailwind CSS 4.
- Backend: Node.js, Express 5, Mongoose.
- Database: MongoDB

## Installation and Local Setup

1. Clone the repository.
2. Install backend dependencies.
3. Install frontend dependencies.
4. Create environment files from templates.
5. Start backend and frontend servers.

### Commands

Backend:

```bash
cd Backend
npm install
copy .env.example .env
npm run dev
```

Frontend:

```bash
cd Frontend
npm install
copy .env.example .env
npm run dev
```

Frontend runs on Vite default port (usually 5173).
Backend runs on port 8080 by default.


## Project Structure (High-Level)

```text
Quirex/
  Backend/
    config/
    model/
    routes/
    uploads/
    index.js
    package.json

  Frontend/
    public/
    src/
      components/
        landing/
        admin/
        users/
      App.jsx
      main.jsx
    package.json
```

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Follow existing code style and folder conventions.
4. Add or update docs for API/feature changes.
5. Submit a pull request with clear change summary and screenshots if UI is affected.

## License

ISC (based on current backend package metadata). Update this section if repository licensing changes.

## Contact

For project discussions, issues, or portfolio inquiries, open a GitHub issue in this repository or contact the project maintainer.
















## Deployment (GitHub + Render + Vercel)

## 1. Push Code to GitHub

1. Create a GitHub repository.
2. Push this project to the repository.
3. Confirm both `Backend` and `Frontend` folders are in the default branch.

## 2. Deploy Backend to Render

1. In Render, create a new **Web Service** from your GitHub repository.
2. Configure:

- Root Directory: `Backend`
- Build Command: `npm install`
- Start Command: `npm start`

3. Add environment variables in Render dashboard (see backend list below).
4. Deploy and copy the generated backend URL (example: `https://quirex-api.onrender.com`).

## 3. Deploy Frontend to Vercel

1. In Vercel, import the same GitHub repository.
2. Configure:

- Root Directory: `Frontend`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

3. Add frontend environment variables in Vercel (see frontend list below).
4. Deploy and note your frontend domain (example: `https://quirex.vercel.app`).

## 4. Configure CORS for Production

In Render backend environment variables, set `CORS_ORIGINS` to include your Vercel domain and local development URL:

```env
CORS_ORIGINS=http://localhost:5173,https://your-frontend-project.vercel.app
```

Redeploy backend after updating environment variables.

## Environment Variables

Create `.env` files in both [Backend/.env.example](Backend/.env.example) and [Frontend/.env.example](Frontend/.env.example) locations by copying their example templates.

### Backend `.env` Template

```env
PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/Quirex
CORS_ORIGINS=http://localhost:5173,https://your-frontend-project.vercel.app
CORS_ORIGIN=http://localhost:5173
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=10
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=1d
```

### Frontend `.env` Template

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_MEDIA_BASE_URL=http://localhost:8080
VITE_APP_NAME=Quirex
VITE_NODE_ENV=development
```

### Render Backend Environment Variables (Required)

- `PORT` (Render sets this automatically)
- `NODE_ENV=production`
- `MONGODB_URI=<your-mongodb-connection-string>`
- `CORS_ORIGINS=http://localhost:5173,https://your-frontend-project.vercel.app`
- `UPLOAD_DIR=uploads`
- `MAX_FILE_SIZE_MB=10`
- `JWT_SECRET=<strong-random-secret>`
- `JWT_EXPIRES_IN=1d`

### Vercel Frontend Environment Variables (Required)

- `VITE_API_BASE_URL=https://your-backend-service.onrender.com/api`
- `VITE_MEDIA_BASE_URL=https://your-backend-service.onrender.com`
- `VITE_APP_NAME=Quirex`
- `VITE_NODE_ENV=production`
