Perfect — you're ready for a **senior-level React machine coding task** with **real system design depth**. Here’s one that companies like Razorpay, Swiggy, and Meesho use in interviews.

---

## 🧠 Advanced Machine Coding Task: **Dynamic Kanban Board (like Trello)**

### 📌 Problem Statement:

Build a dynamic Kanban board to track tasks in different stages (e.g., TODO, In Progress, Done). Users should be able to:

* Add new tasks
* Drag and drop tasks between columns
* Edit/delete tasks
* Persist state (localStorage or mock API)

---

## 🧩 Core Features

### 1. **Board with Columns**

* Columns: `Todo`, `In Progress`, `Done` (flexible to add more)
* Each column contains **cards** (tasks)

### 2. **Task Card**

* Each card has: Title, Description (optional), Timestamp, Tags
* Edit/Delete options on each card

### 3. **Add Task Modal**

* Click “Add Task” → open modal to enter details
* Select which column to add to

### 4. **Drag & Drop**

* Use `react-beautiful-dnd` or `dnd-kit` to drag cards across columns

### 5. **Persistence**

* Store board state in `localStorage`
* Optional: Sync with mock API or Supabase

---

## 🧱 Suggested Component Structure

```
/components
  ├── Board.jsx
  ├── Column.jsx
  ├── TaskCard.jsx
  ├── AddTaskModal.jsx
  ├── Header.jsx
  └── useKanbanBoard.js (custom hook to manage state)
```

---

## 🛠️ Tech Stack

* React (functional components + hooks)
* `react-beautiful-dnd` or `dnd-kit`
* `Tailwind CSS` or `CSS Modules`
* `localStorage` for persistence
* Optional: Context API or Zustand for state

---

## 🧠 System Design Concepts Practiced

* **State management** of complex nested data (board → columns → tasks)
* **Data modeling** for flexibility (task schema, board config)
* **Drag-and-drop** UX
* **Scalability** — Can grow into a full-featured project manager

---

## ⏱️ Time Estimation

* MVP: 3–5 hours
* Fully polished version: 6–10 hours

---

## 🔥 Bonus Challenges

* Task filtering by tags or status
* Reorder columns or cards within columns
* Multi-board support (think: Trello workspaces)
* WebSocket support (if collaborating in real-time)

---

Would you like:

* A visual wireframe?
* Starter files and folder structure?
* Help breaking it down into subtasks?

Let me know how deep you want to go!
