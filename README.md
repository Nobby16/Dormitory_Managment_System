# Dormitory Management System

A full-stack web application designed to streamline dormitory operation processes, including administrative oversight, student requests, issue reporting, operational tracking, and marketplace features.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## Features

- **Authentication & Role-Based Access**: Role management and security layer covering Admins, Proctors, and Students.
- **Student Dashboard**: Clean view for announcements, maintenance requests, complaints, and marketplace interactions.
- **Admin & Proctor Portals**: Manage dorm allocations, event scheduling, student clearance, and operational reports.
- **Maintenance & Complaints**: Real-time tracking of reported issues and repair progress.
- **Marketplace & Orders**: Internal platform for dormitory students to list and buy items.
- **Exit Clearance & Payments**: Integrated forms and status tracking for checkout clearances and payment verification.

---

## Project Structure

```text
Dormitory_Managment_System/
├── client/                      # Frontend Application (Vite + React)
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── api/                 # API service handlers
│   │   │   ├── adminApi.js
│   │   │   ├── adminDormApi.js
│   │   │   ├── authApi.js
│   │   │   ├── axiosConfig.js
│   │   │   ├── complaintApi.js
│   │   │   ├── dormApi.js
│   │   │   ├── eventApi.js
│   │   │   ├── exitClearanceApi.js
│   │   │   ├── lostFoundApi.js
│   │   │   ├── maintenanceApi.js
│   │   │   ├── marketplaceApi.js
│   │   │   ├── noticeApi.js
│   │   │   ├── notificationApi.js
│   │   │   ├── operationalReportApi.js
│   │   │   ├── orderApi.js
│   │   │   ├── paymentApi.js
│   │   │   ├── proctorApi.js
│   │   │   ├── roleApplicationApi.js
│   │   │   └── studentApi.js
│   │   ├── assets/              # Dashboard images, hero visuals, icons
│   │   ├── App.jsx              # Main App layout and routing
│   │   └── App.css              # Global styles
│   ├── .env                     # Client environment configuration
│   ├── eslint.config.js         # ESLint configuration
│   ├── index.html               # Entry HTML template
│   ├── package.json             # Frontend dependencies & scripts
│   └── postcss.config.js        # PostCSS configuration
└── README.md
