<h1 align="center">🧩 SoloCode — Offline Coding Judge</h1>
<p align="center"><strong>Offline Algotrainer, powered by Rust, Tauri, and a secure WASM execution engine.</strong></p>

---

## 🚀 Overview

**SoloCode** is a fully offline, cross-platform coding judge designed to run algorithmic challenges without Internet access.

It includes:

- ⚡ A **Rust backend** with a WASM sandbox  
- 🖥️ A **Tauri + React UI**  
- 🏛️ A clean **Hexagonal Architecture**  
- 🧪 A multi-testcase **judge engine**  
- 💾 Offline storage using SQLite/JSON bundles  

SoloCode enables you to practice algorithms anywhere with native performance and full security.

---

## 🛠️ Tech Stack

### Backend (Rust)
- Rust
- WASM sandbox execution engine
- Strongly typed domain model
- Execution pipeline (Run / Test / Judge)

### Frontend (Tauri + React)
- Tauri shell for native desktop app
- React + Vite interface
- Secure Rust ↔ JS commands

### Storage
- Offline JSON bundles
- SQLite local DB
- Storage & Database Adapters

---

## 🧩 Features

### 🔐 Secure Offline Execution
- WASM sandbox prevents unsafe code
- Time & memory limits
- Zero network access
- Cross-language execution

### 🧪 Judge Engine
- Multi-test evaluation
- Precise output comparison
- TLE / MLE / RE / WA / CE detection
- Per-test timeout handling
- Detailed execution logs

### 🧱 Hexagonal Architecture
- **Entities:** Problem, TestCase, Submission  
- **Value Objects:** ExecutionResult, TestResult, JudgeResult  
- **Use Cases:** run, test, judge submission  
- **Adapters:** storage, db, ui bridge
  
<img width="6184" height="3032" alt="SoloCode - Page 2" src="https://github.com/user-attachments/assets/59b56ae8-7cbd-44a3-af4d-a770cb1e3b20" />
  