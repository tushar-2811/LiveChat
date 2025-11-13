# 💬 Chat App — Microservices Architecture with Next.js & Node.js

## 🧩 Project Overview

This project is a **real-time chat application** built with a **microservices architecture** to achieve scalability, reliability, and clean separation of concerns.  

It allows users to chat in real time with **WebSocket-based communication**, secure **OTP-based authentication via email**, and **media uploads** through Cloudinary or AWS S3.  
All services are containerized using **Docker** and communicate asynchronously via **RabbitMQ**, ensuring smooth operation even under heavy loads.

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **Next.js (TypeScript)** – Modern React framework for UI and SSR  
- **Tailwind CSS** – Utility-first styling for rapid UI development  
- **shadcn/ui** – Beautiful and accessible prebuilt components  
- **Zod** – Schema validation for forms and API contracts  

### 🧠 Backend Microservices
Each backend service runs independently and communicates via **RabbitMQ**.

#### 🧍‍♂️ `user_service`
- Handles user registration, login, and profile management  
- Implements **OTP-based email authentication** (no password)  
- Validates payloads using **Zod**  
- Stores user data in **MongoDB**

#### 📧 `mail_service`
- Sends OTPs and other notification emails  
- Uses **SMTP** for email delivery  
- Integrated with **RabbitMQ** for reliable, asynchronous message handling  

#### 🔌 `socket_service`
- Manages **real-time communication** via WebSockets  
- Handles active user sessions, typing indicators, and message delivery  
- Uses **Redis** for pub/sub message propagation and session caching  

---

## ☁️ Cloud & Infrastructure

- **AWS ECS / EC2 / S3** – Deployment and scalable file storage  
- **Cloudinary** – Image upload & optimization (alternative to S3)  
- **RabbitMQ** – Queue-based communication between services  
- **Redis** – Caching layer and WebSocket event pub/sub  
- **MongoDB** – Main database for user and chat data  
- **Docker & Docker Compose** – Containerization and orchestration  

---

## 🔑 Core Features

- 🔐 **OTP-Based Email Authentication** (no password required)  
- 💬 **Real-Time Chat** powered by WebSockets  
- 🧩 **Microservices Architecture** for scalability  
- 📧 **Email Delivery via SMTP & RabbitMQ Queue**  
- 🖼️ **Media Uploads** (Cloudinary or AWS S3)  
- ⚡ **Redis-Powered Caching & Message Sync**  
- 🐳 **Dockerized Setup** for local and cloud environments  
- 🌍 **Deployed on AWS**

---

## 🧭 Architecture Overview

