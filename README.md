# Crisa - Conversational AI Assistant

Crisa is a modern, responsive conversational AI assistant built with a Next.js frontend and a FastAPI backend. It features a clean, mobile-first interface with advanced capabilities like real-time AI thinking display.

## 🚀 Features

- **Conversational Interface**: A seamless chat experience with a modern UI.
- **AI Thinking Display**: Real-time visualization of the AI's reasoning process.
- **Responsive Design**: Fully optimized for mobile and desktop devices.
- **Fast & Modern Tech Stack**: Built with the latest versions of Next.js, FastAPI, and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: [Python 3.14+](https://www.python.org/)
- **Validation**: [Pydantic](https://docs.pydantic.dev/)
- **Dependency Management**: [uv](https://github.com/astral-sh/uv)

## 📁 Project Structure

```text
crisa/
├── backend/          # FastAPI backend application
│   ├── core/         # Core configurations and utilities
│   ├── models/       # Pydantic models for data validation
│   ├── routers/      # API route definitions
│   └── services/     # Business logic and external integrations
├── frontend/         # Next.js frontend application
│   ├── src/          # Application source code
│   │   ├── app/      # Next.js App Router pages and layouts
│   │   ├── components/ # Reusable React components
│   │   └── lib/      # Utility functions and API clients
└── README.md         # Project documentation (you are here)
```

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [Python](https://www.python.org/) (v3.14 or later)
- [pnpm](https://pnpm.io/installation)
- [uv](https://github.com/astral-sh/uv#installation)

### 1. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Install dependencies and start the development server:

```bash
uv run fastapi dev
```

The backend will be available at `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the `frontend` directory:

```bash
cd frontend
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## 📄 License

This project is private and for internal use only.
