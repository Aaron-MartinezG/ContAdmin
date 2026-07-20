# Accounting Management System

A full-stack web application for accounting management built with the **MEAN Stack** (MySQL, Express, Angular, Node.js). This project provides a robust and intuitive interface to manage clients, invoices, and accounting services, complete with a fully functional REST API.

## Features

* **Full CRUD Operations:** Create, Read, Update, and Delete records seamlessly across the platform.
* **Client Management:** Register clients, link them to specific accounting services, and track their active status and monthly fees.
* **Service Catalog:** Maintain a catalog of services (e.g., General Accounting, Payroll, Tax Consulting) with their respective descriptions and base prices.
* **Invoice Tracking:** Manage client invoices, track their issue and payment dates, and monitor their status (Pending, Paid, Canceled).
* **Interactive UI:** Built with Angular and Bootstrap for a responsive and modern user experience.
* **Smart Notifications:** Integrated with SweetAlert2 for elegant confirmation modals and success/error alerts.
* **Component Reusability:** Efficient Angular architecture using `ActivatedRoute` to recycle forms for both creation and edition modes.

## Tech Stack

* **Frontend:** Angular 17+, TypeScript, Bootstrap, SweetAlert2
* **Backend:** Node.js, Express.js, CORS
* **Database:** MySQL (using `mysql2` driver)

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

### 1. Database Setup
1. Make sure you have MySQL installed and running.
2. Open your MySQL client (e.g., MySQL Workbench).
3. Execute the SQL script located in `NodeProyectoFinal/DB Proyecto Final.sql` to create the database schema, tables, and initial seed data.
4. If your MySQL credentials are different from `root` / `aaronsql04`, update them in `NodeProyectoFinal/db.js`.

### 2. Backend (Node.js API)
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd NodeProyectoFinal
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```
   *The server will run on `http://localhost:3000`.*

### 3. Frontend (Angular App)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd AngularProyectoFinal/app-final
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   npm run start
   # or
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200/`.

## Contact
Created by Aaron Martinez G. Feel free to reach out on LinkedIn!
