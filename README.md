# Ecom API & SPA Project

This is a secure e-commerce platform project for the 6003CEM module at Coventry University.  
It includes:

- A **Koa RESTful API** with MySQL
- A **React Single Page Application** (SPA) frontend
- JWT authentication & role-based authorization
- Full database-backed products, reviews, and cart functionality
- Automated tests with Jest + Supertest

---

## 🚀 Running on Codio

### ✅ Starting the API server
1. Open your Codio terminal
2. Navigate to the backend folder:
    ```bash
    cd ~/workspace/ecom-api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm run dev
    ```
5. Your API runs on:
    ```
    https://memphislaptop-sierracorrect-3001.codio-box.uk/api
    ```

---

### ✅ Starting the React client
1. In a new Codio terminal:
    ```bash
    cd ~/workspace/client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the app:
    ```bash
    npm start
    ```
4. View it on:
    ```
    https://memphislaptop-sierracorrect-3000.codio-box.uk/
    ```

---

## ✅ Running API tests
Inside the `ecom-api` folder:

```bash
npm run test