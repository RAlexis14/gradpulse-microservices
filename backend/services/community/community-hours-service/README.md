# Community Hours Service 🌍

Microservice responsible for registering, calculating, and tracking community service hours for students as part of their academic requirements.

---

## 🎯 Responsibilities
- Register community service hours per student
- Calculate total accumulated hours
- Emit domain events when hours are updated

This service follows the **Single Responsibility Principle (SRP)** and maintains **High Cohesion** by focusing exclusively on community hours logic.

---

## 🧱 Architecture
- **Style:** Layered Architecture
- **Communication:** REST + Events (stub)
- **Database:** PostgreSQL

