# 🚀 E-Commerce Admin Dashboard

A modern, scalable, and production-inspired Admin Dashboard for managing an E-commerce platform.

Built with a strong focus on clean architecture, maintainability, and real-world frontend engineering practices.

## 📌 Overview

This project simulates a production-ready admin interface used to manage:

Products

Categories

Orders

Users

The system is designed to reflect how a real-world administrative panel would be structured in a professional development environment.

## 🎯 Project Objectives

Build a realistic E-commerce admin dashboard

Apply modern frontend engineering best practices

Implement clean, scalable architecture

Integrate backend APIs using documented endpoints

Use industry-standard UI systems and tooling

Simulate real-world development workflow

## ✨ Features
## 🖥 Dashboard

Overview of administrative operations

Structured layout with reusable components

## 📦 Product Management

Create new products

Update product details

Delete products

View dynamic product lists

## 🗂 Category & Catalog Management

Organize products into structured categories

Manage catalog data

## 🧾 Order Management

Track and monitor orders

View order details

## 👥 User Management

Manage user-related data

Structured admin controls

## 🔗 API Integration

REST API communication using Axios

Real-time UI updates after CRUD operations

Error handling and loading states

## 🛠 Tech Stack

### Technology	Purpose
```bash
Vite-	Fast development server & build tool
React-	Component-based UI architecture
TypeScript-	Static typing for safer, scalable code
Tailwind CSS-	Utility-first styling system
shadcn-ui-	Reusable and accessible UI components
Axios	API communication layer
```

## 🏗 Architecture Overview

The application follows a modular, feature-based architecture to promote scalability and maintainability.

📁 Project Structure

```bash
src/
 ├── pages/        # Feature-level screens
 ├── components/   # Reusable UI components
 ├── hooks/        # Custom React hooks
 ├── lib/          # Utilities & global configurations (Axios setup)
 ├── App.tsx       # Routing and layout structure
 └── main.tsx      # Application entry point
```

```bash
## 🔄 Data Flow
User Action
   ↓
Page Component
   ↓
Axios Service (/lib)
   ↓
Backend API
   ↓
Response
   ↓
State Update
   ↓
UI Re-render
```

This separation ensures that UI logic remains independent from networking and configuration logic.

## 🔌 API Integration

The frontend integrates with backend REST APIs through documented endpoints.

### Frontend responsibilities include:

Centralized Axios configuration

Environment variable management

Handling GET, POST, PATCH, DELETE requests

Managing loading and error states

Synchronizing UI with backend responses

This mirrors professional frontend–backend collaboration.

## ⚡ Challenges & Solutions
1️⃣ API Structure Interpretation

Understanding backend documentation and mapping it to frontend models.

Solution:
Defined TypeScript interfaces and tested endpoints before integration.

2️⃣ State Synchronization

Ensuring UI updates correctly after create, update, or delete actions.

Solution:
Implemented controlled state updates and re-fetch strategies.

3️⃣ Environment Configuration

Managing base URLs across development and production.

Solution:
Used environment variables and centralized Axios configuration.

## 🚀 Getting Started
✅ Prerequisites

Node.js (v18+ recommended)

npm

📦 Installation
# Clone the repository
git clone https://github.com/nimietech/hok-admin.git

# Navigate into the project directory
cd hok-admin

# Install dependencies
npm install

# Start development server
npm run dev


App runs at:

http://localhost:8080

🔮 Future Improvements

Role-based authentication & authorization

Advanced filtering & search

Unit & integration testing

Caching strategies

## 📚 Learning & Growth

This project strengthened my frontend engineering capabilities in:

Modular architecture design

Type-safe API integration

Scalable component structuring

Production-level thinkin
