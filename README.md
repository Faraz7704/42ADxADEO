# Unikamel Project Setup & Features

## Overview

Unikamel is a robust platform tailored for the **Abu Dhabi Executive Office**, designed to streamline internal opinion request processes across its departments. It leverages AI to simplify communication and ensure efficient handling of queries within the organization.

> **Important:** Running the project locally requires significant resources due to the large language model (LLM) size (~400GB). For faster testing, connect to our deployed server:  
> **Visit:** [http://34.145.30.110](http://34.145.30.110)

---

## Features

- **Internal Opinion Requests**: Facilitates seamless submission and tracking of opinion requests within internal departments.
- **AI-Powered Summaries**: Generates concise, actionable summaries for complex queries.
- **Keyword Search**: Ensures efficient retrieval and prevents duplicate requests.
- **Role-Based Access Control (RBAC)**: Directs requests to the appropriate department or individual based on roles.
- **Microservices Architecture**:
  - **unikamel-id**: Handles user authentication and management.
  - **unikamel-ask**: Manages the opinion request process.
  - **unikamel-notify**: Sends notifications and updates on request statuses.

---

## Local Setup

### Prerequisites

1. **Docker**: Ensure Docker and Docker Compose are installed.
2. **GPU Support**: For AI features, ensure NVIDIA GPU drivers are installed.

### Quick Start

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```
2. Start all services:
   ```bash
   docker-compose up --build
   ```
   This command initializes:
   - **Frontend** (port `3000`)
   - **PostgreSQL Database** (port `5432`)
   - **AI Microservices**:
     - `ai-parse` (port `5000`)
     - `ai-summary` (port `5002`)
   - **Nginx** (ports `80/443`)

---

## Notes on Performance

- Running locally is resource-intensive due to the LLM size (~400GB).
- To avoid delays:
  - Use the deployed server at [http://34.145.30.110](http://34.145.30.110).
  - Persist PostgreSQL data using the `ai-db-data` volume.

---

## Configuration Details

### Docker Compose Services

- **Frontend**: User interface, accessible at `http://localhost:3000`.
- **PostgreSQL Database**:
  - Service: `ai-db`
  - Environment Variables:
    - `POSTGRES_DB`
    - `POSTGRES_USER`
    - `POSTGRES_PASSWORD`
- **AI Microservices**:
  - **ai-parse**: Processes and parses opinion requests.
  - **ai-summary**: Generates summaries for responses.
- **Nginx**: Reverse proxy for frontend and backend services.

---

## Troubleshooting

- **Docker Errors**: Verify Docker and NVIDIA drivers.
- **Performance Issues**: Prefer the deployed server for faster response times.
