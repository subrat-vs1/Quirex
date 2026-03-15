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
