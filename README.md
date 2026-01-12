# Product Hub API & SPA

This is a secure e-commerce platform project for Coventry University (6003CEM).

It includes:
- A **Koa REST API** with MySQL for products, reviews, and authentication
- A **React SPA client** connecting via Axios
- JWT authentication with roles
- Jest + Supertest API endpoint tests

<img width="1838" height="903" alt="image" src="https://github.com/user-attachments/assets/46e16234-5b74-40d7-bf90-95462c4e5fc4" />


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
