## 🛠 Set up database

The application uses **PostgreSQL** hosted on **Neon** cloud and **Prisma 7** ORM.

1. Copy your database connection string from the Neon dashboard (ensure you use the pooled connection URL containing `-pooler`).
2. Navigate to the `backend` directory and create an environment configuration file named `.env`:
   ```bash
   cd backend
   touch .env
   ```
3. Insert your Neon database connection string into the `.env` file:
   ```env
   DATABASE_URL="postgresql://neondb_owner:your_password@ep-steep-pond-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ```
4. Synchronize the database schema with your Neon cloud instance directly:
   ```bash
   npx prisma db push
   ```

---

## 🚀 Start frontend and backend

Thanks to the pre-configured **`concurrently`** package in the project root, you don't need to manually spin up the backend and frontend in separate terminals.

1. Return to the root directory of the `Quiz-Builder` project:
   ```bash
   cd ..
   ```
2. Install all monorepo dependencies:
   ```bash
   npm install
   ```
3. Run both the Express API and Next.js frontend servers simultaneously with a single command:
   ```bash
   npm run dev
   ```

Once started:

- 💻 **Frontend** (Next.js App Router) will be live at: [http://localhost:3000](http://localhost:3000)
- ⚙️ **Backend** (Express.js API) will be live at: [http://localhost:4000](http://localhost:4000)

---

## 📝 Create sample quiz

You can populate your Neon database with sample quizzes using either of the following method:

## Via the Web Interface

1. Open your browser and navigate to the creation page: [http://localhost:3000/create](http://localhost:3000/create).
2. Enter a quiz title.
3. Click the **`+ add question`** button, type your question body, and select its type:
   - **Boolean**: Select the correct radio option (True or False).
   - **Input**: Enter the exact word or phrase into the correct answer field.
   - **Checkbox**: Click _`+ add option`_, fill in the option text, and check the boxes for the correct choices.
4. Click the **`save quiz`** button. This sends a `POST /quizzes` request to the backend, and the new quiz will instantly appear on the dashboard
