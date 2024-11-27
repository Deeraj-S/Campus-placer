# Campus Placer

Campus Placer is a web-based platform that streamlines the college placement process by providing an interface where students can view visiting companies and apply for jobs directly. The applications are automatically forwarded to the college's placement department, ensuring a smooth and organized process.

### My Role
I was responsible for both the **frontend design** and **backend development** of this project. Initially, the project was built with static roles, but I have since enhanced it by implementing **dynamic role-based access control** with specific permissions for each role.

## User Modules

There are three types of users in this system:

1. **Admin (Super User)**: Responsible for assigning roles and managing users.
2. **Placement Officer**: Handles placement-related tasks and manages job opportunities.
3. **Students**: Access the platform to view job opportunities and apply for them.

### Admin Responsibilities
- Assign roles and their corresponding permissions.
- Add branch details (e.g., MCA, MSc, etc.).
- Register students and placement officers in the system.

#### Admin Permissions
The **Admin** can enable the following permissions for themselves:
- **Student Management**: View, add, edit, and delete student records.
- **Branch Management**: View, add, edit, and delete branch details.
- **Placement Officer Management**: View, add, edit, and delete placement officer records.
- **Job Category**: View job categories.

The **Admin** grants the following permissions to the **Placement Officer**:
- **Student Management**: View student records.
- **Job Category Management**: View, add, edit, and delete job categories.
- **Job Management**: View, add, edit, and delete job postings.

The **Admin** assigns the following permissions to **Students**:
- **Job Access**: View available jobs.
- **Application Submission**: Apply for jobs.

### Placement Officer Responsibilities
- View student details.
- Add job categories (e.g., IT, Non-IT, etc.).
- Add job details based on company requirements.

### Student Responsibilities
- View available job opportunities.
- Submit applications for desired jobs.
  

## How to Test the Project

### 1. Setup Frontend
Navigate to the **Campus frontend** directory and run the following command to start the frontend application:
```bash
npm start


### 2. Setup Backend
   - Go to the **CampusPlacer backend directory**.
   - Run the following command:
     - If you have **Nodemon** installed:
       ```bash
       nodemon index.js
       ```
     - If you don't have **Nodemon** installed, run:
       ```bash
       node index.js
       ```

### 3. Access the Application
   - After running the backend, the application will redirect to:
     ```
     http://localhost:3000/#/login
     ```

### 4. Admin Registration
   - To allow the **admin** to register, change the URL to:
     ```
     http://localhost:3000/#/register
     ```
   - **Note**: The `/register` URL is restricted to the admin only.

### 5. Admin Login
   - After registering, **log in as the admin** and perform the following:
     - Add a **role**.
     - Add a **student record**.
     - Add a **placement record**.

### 6. Log Out and Placement Officer Login
   - After adding the records, **log out** from the top right corner.
   - **Log in as the placement officer**.

### 7. Placement Officer Operations
   - As the **placement officer**, follow these steps:
     - Add a **job opening** and fill in all the company details.

### 8. Student Login
   - **Log out** and **log in as a student**.
   - As a **student**, apply for a job from the available openings.

### 9. View Applications
   - Finally, **log in as the placement officer** again to view the details of students who have applied for the listed jobs.

---

## System Features and Role-based Access

The system is designed with **role-based access control** to ensure specific permissions for each user type. Here's an overview:

### Admin Role
- The **admin** has full control over the system, including:
  - Assigning roles to users.
  - Managing students, branches, placement officers, and job categories.
  - Adding, editing, or deleting records as needed.

### Placement Officer Role
- **Placement officers** can:
  - Manage job categories and postings.
  - View student details.
  - Track applications and manage job opportunities.

### Student Role
- **Students** can:
  - View available job openings.
  - Apply for positions they are interested in.
  - Track their applications' status.

### Dynamic Role-based Access
- The system uses dynamic **role-based access control (RBAC)**, ensuring that each user type has specific permissions based on their role.
- This ensures both security and efficient management of records and actions within the system.

---

## Notes
- Make sure to follow the above steps to simulate the workflow for all user types: admin, placement officer, and student.
- The system relies on proper role-based access control to ensure that users can only perform actions allowed by their respective roles.

---



   
