```markdown
# BeautyBook System

BeautyBook is an advanced system designed for managing beauty appointments, services, and staff. It allows users to add, update, delete, and view records, with features like search, filter, and PDF report generation. The system uses a modern tech stack and is containerized using Docker for seamless deployment.


---


## Features

- User Authentication and Authorization
- CRUD Operations for:
  - Appointments
  - Services
  - Staff
- Search and filter by:
  - Name
  - Price range
  - Date
- PDF Report Generation for Appointments
- Fully responsive UI with React Bootstrap
- Optimized for large datasets and high-performance operations

---

## Tech Stack

### Frontend
- React.js: Component-based user interface
- Axios: API integration
- React Bootstrap: UI styling and responsiveness

### Backend
- Node.js: JavaScript runtime
- Express.js: Backend framework
- Prisma: ORM for database interactions
- MySQL: Database

### Deployment
- Docker: Containerization of frontend, backend, and database
---

## Setup Instructions

### 1. Prerequisites
Ensure the following tools are installed on your system:
- Node.js (v22.11.0)
- Docker & Docker Compose
- Prisma CLI (`npm install -g prisma`)

---

###  Running the Project

#### Using Docker Compose
1. Build and start containers:
    ```bash
    docker-compose build --no-cache
    ```
    ```bash
    docker-compose up
    ```
2. Open the application:
   - Frontend: [http://localhost:80](http://localhost:80)
   - Backend API: [http://localhost:5000](http://localhost:5000)

#### Manual Setup (Without Docker)
1. MYSQL:
    - Install MySQL Server from the official MySQL Image.
      ```bash
      docker run --name beautybook-db -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=beautybook -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:9.1
      ```
      ```bash
      docker run --name beautybook-shadowdb -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=beautybook -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3307:3306 -d mysql:9.1
      ```
2. Backend:
   - Navigate to `beautybook-backend/`:
     ```bash
     cd beautybook-backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```
   - Start the backend:
     ```bash


3. Frontend:
   - Navigate to `beautybook-frontend/`:
     ```bash
     cd beautybook-frontend
     ```
   - Install dependencies:
     ```bash
     npm install 
     ```
   - Start the frontend:
     ```bash
     npm run start
     ```

---





## License
This project is licensed under the MIT License.
```
