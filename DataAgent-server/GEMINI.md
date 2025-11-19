# Project: DataAgent-server

## Project Overview

This project is a full-stack web application named "DataAgent". It features a Java Spring Boot backend and a Vue.js frontend. The application appears to provide a chat interface, likely interacting with an LLM (Large Language Model) via an API, as evidenced by the recent integration of a real LLM provider.

**Key Technologies:**
*   **Backend:** Java 17, Spring Boot, Maven, MyBatis, MySQL.
*   **Frontend:** Vue.js 3, Vite, npm, SASS, Ant Design Vue, Element Plus, Vue-DevUI.

## Building and Running

### Backend

The backend is a Spring Boot application. It requires a MySQL database for operation.

**Prerequisites:**
*   Java Development Kit (JDK) 17 or higher
*   Apache Maven
*   MySQL Server

**Database Configuration:**
The database connection details are expected to be configured in `src/main/resources/application.properties`. You will need to set up a MySQL database (e.g., named `data_agent`) and provide the appropriate credentials. An example configuration would be:

```properties
spring.application.name=DataAgent-server
spring.datasource.url=jdbc:mysql://localhost:3306/data_agent?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

**To Run the Backend:**
Navigate to the root directory of the project (`DataAgent-server/`) and execute:

```bash
mvn spring-boot:run
```

### Frontend

The frontend is a Vue.js application built with Vite.

**Prerequisites:**
*   Node.js (version 22.16.0 as specified in `frontend/README.md`)
*   npm (Node Package Manager)

**API Key Configuration:**
The frontend communicates with a real LLM API. The API key (`BAISHAN_API_KEY`) is loaded from an environment variable. Create a `.env` file in the `frontend/` directory and add your API key:

```
VITE_BAISHAN_API_KEY="your_actual_api_key_here"
```
*(Replace `"your_actual_api_key_here"` with your actual key.)*

**To Run the Frontend:**
1.  Navigate to the `frontend/` directory:
    ```bash
    cd frontend
    ```
2.  Install the project dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend application will typically be accessible at `http://localhost:5173/` (or another port as indicated by Vite upon startup).

## Development Conventions

*   **Backend:** Follows standard Spring Boot project structure and Maven conventions. Uses Lombok for reducing boilerplate code.
*   **Frontend:** Uses Vue 3 with the Composition API. Styling is done with SASS. UI components are sourced from Ant Design Vue, Element Plus, and Vue-DevUI. Vite is used as the build tool, and `import.meta.env` is utilized for environment variables.
*   **Code Style:** Adhere to the default code styles enforced by Vue.js and Spring Boot best practices.
