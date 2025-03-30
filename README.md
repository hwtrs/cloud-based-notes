# **Cloud-Based Notes**

A simple cloud-based notes application that allows users to create, edit, and manage notes.
Notes are absolutely not-secure, obviously don't create an account with login information
that you use for other services, don't store sensitive information within the app.

## **Features**

- **User authentication** (login & account creation)
- **Create, edit, and delete notes**
- **Auto-saving functionality**
- **Responsive UI**

## **Tech Stack**

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Deployment:** Vercel

## **Installation**

### **Prerequisites**

- **Node.js**
- **MySQL database**

### **Steps**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cloud-based-notes.git
   cd cloud-based-notes
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up the file in the directory with the following:**
   ```env
   MYSQL_HOST=your-database-host
   MYSQL_USER=your-database-user
   MYSQL_PASSWORD=your-database-password
   MYSQL_DATABASE=your-database-name
   ```
4. **Start the server locally:**
   ```bash
   node server.js
   ```

## **API Endpoints**

### **Authentication**

  - Login
  - Create account

## **Deployment**

The project is deployed using **Vercel**. Ensure `vercel.json` is properly configured for API and static file routing.

