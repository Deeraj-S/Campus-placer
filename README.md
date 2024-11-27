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

Follow these steps to run and test the application:

1. Navigate to the **Campus frontend** directory and run:
   ```bash
   npm start
