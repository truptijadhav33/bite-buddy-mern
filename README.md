# 🍽️ BiteBuddy - full-stack restaurant management platform

A full-stack **Restaurant Management Platform** built using the **MERN stack** to manage restaurant operations efficiently for **Admins, Staff, and Customers**.  
This project is designed with **modern UI, role-based access, and real-world workflows**, making it ideal for portfolio and resume showcase.

---

## 🚀 Features

### 👨‍💼 Admin Panel
- Dashboard with key statistics (orders, revenue, tables)
- Menu management (add / update / delete items)
- Order management with real-time status updates
- Table management (availability & capacity)
- Role-based access control

### 🧑‍🍳 Staff Panel
- View active orders
- Update order status (Pending → Preparing → Completed)
- Kitchen view for food preparation tracking

### 👥 Customer Panel
- Browse menu with modern UI
- Add items to cart
- Place orders
- View order history
- Table booking (reservation system)
- Location & contact section with map integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Redux Toolkit
- Modern component-based UI

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Other Tools
- JWT Authentication
- Role-based route protection
- RESTful APIs

---

## 🧩 Project Structure

```bash
restaurant-platform/
│
├── client/
│  ├── src/
│  │ ├─ app/ # Redux store & hooks
│  │ ├─ assets/ # Images, icons
│  │ ├─ components/ # Reusable & role-based components
│  │ │ ├─ admin/
│  │ │ ├─ staff/
│  │ │ ├─ customer/
│  │ │ ├─ common/
│  │ │ └─ ui/
│  │ ├─ pages/ # Application pages
│  │ │ ├─ admin/
│  │ │ ├─ staff/
│  │ │ ├─ customer/
│  │ │ └─ auth/
│  │ ├─ routes/ # Role-based routing  
│  │ ├─ services/ # API service layer
│  │ ├─ slices/ # Redux slices
│  │ ├─ utils/ # Helpers & guards
│  │ ├─ App.jsx
│  │ └─ main.jsx
│  └─ index.html
│
├── server/                 # Backend (Node + Express)
│  ├── config/
│  │ └─ db.js # MongoDB connection  
│  ├── controllers/
│  ├── models/
│  ├── routes/
│  ├── middleware/
│  ├── utils/
│  ├── server.js
│  └─ seeder.js # Sample data seeding
│
└── README.md
```

---

## 📚 Sample Data

- Admin: admin@example.com / password123
- Staff: staff@example.com / password123
- Customer: customer@example.com / password123

---

## 📝 License

MIT License