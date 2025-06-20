# Express, Mongo, Vite, TS Full-Stack Starter Project

### *A zero-config starter npm package to scaffold a FullStack monorepo with:*

- ⚙️ **Backend**: Node.js + Express.js + MongoDB + TypeScript + JWT-Auth
- ⚛️ **Frontend**: React.js + Vite + TailwindCSS + TypeScript

---

## 📁 Project Structure

```
my-app/
├── backend/        # Express.js + MongoDB + TypeScript API for basic User Authorization
│   └── ...
├── frontend/       # Vite + React.js + TailwindCSS + TypeScript Template App
│   └── ...
├── README.md       # README.md with steps to setup .env & prerequite details
```

---

## 🛠 Setup Instructions

### 1. Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Create `.env` files in both `backend/` and `frontend/`:

#### Example backend `.env`

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db OR a MongoDB Atlas URI
JWT_SECRET=your-secret-key
NODE_ENV=development OR production

ADMIN_PASSWORD=your-admin-password
```

#### Example frontend `.env`

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🧪 Development

Under `backend/` execute:

```bash
npm run dev     # Start backend
```

Under `frontend/` execute:

```bash
npm run dev     # Start frontend
```

Navigate to `http://localhost:5173` to start your development journey.

---

## 🙌 Credits

Created by [Tamojit Das](https://github.com/Tamoziit)

---