# CatCatchCode 🐱💻

CatCatchCode is a comprehensive educational platform designed to provide students and developers with high-quality resources, including handwritten notes, video tutorials, AI resources, and course materials. The platform features a robust administrative panel for managing content and a user dashboard for tracking learning progress.

## 📱 Connect With Us

Stay updated with the latest resources and community updates!

<div align="left">
  <a href="https://catcatchcode.online/">
    <img src="https://img.shields.io/badge/Website-catcatchcode.online-blue?style=flat-square&logo=google-chrome&logoColor=white" alt="Website" />
  </a>
  <a href="mailto:catcatchcode@gmail.com">
    <img src="https://img.shields.io/badge/Email-Contact%20Us-red?style=flat-square&logo=gmail&logoColor=white" alt="Email" />
  </a>
</div>

### Social Media
<div align="left">
  <a href="https://www.youtube.com/channel/UCgzmNjDq8kI3StWFrIv7QZg">
    <img src="https://img.shields.io/badge/YouTube-Official%20Channel-red?style=flat-square&logo=youtube&logoColor=white" alt="YouTube Official" />
  </a>
  <a href="https://www.youtube.com/channel/UCX8i_v1eL9VuLWG1fKwEXhw">
    <img src="https://img.shields.io/badge/YouTube-Abhijay%20Shah-red?style=flat-square&logo=youtube&logoColor=white" alt="YouTube Team Lead" />
  </a>
  <a href="https://www.instagram.com/cat_catch_code/">
    <img src="https://img.shields.io/badge/Instagram-@cat__catch__code-E4405F?style=flat-square&logo=instagram&logoColor=white" alt="Instagram" />
  </a>
  <a href="https://www.linkedin.com/in/catcatchcode/">
    <img src="https://img.shields.io/badge/LinkedIn-CatCatchCode-blue?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://x.com/catcatchcode">
    <img src="https://img.shields.io/badge/Twitter-@catcatchcode-black?style=flat-square&logo=x&logoColor=white" alt="Twitter" />
  </a>
  <a href="https://github.com/catcatchcode">
    <img src="https://img.shields.io/badge/GitHub-catcatchcode-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.facebook.com/catcatcatchcode">
    <img src="https://img.shields.io/badge/Facebook-CatCatchCode-1877F2?style=flat-square&logo=facebook&logoColor=white" alt="Facebook" />
  </a>
  <a href="https://www.reddit.com/user/Super_Cartoonist1246/">
    <img src="https://img.shields.io/badge/Reddit-u%2FSuper__Cartoonist1246-FF4500?style=flat-square&logo=reddit&logoColor=white" alt="Reddit" />
  </a>
</div>

---

## 📺 Project Demo & Workflow
- **Live Demo**: [Click here to view the live site](https://catcatchcode.online/)
- **Video Walkthrough**: [Watch on YouTube](https://www.youtube.com/channel/UCgzmNjDq8kI3StWFrIv7QZg)

---

## 🖼️ Visual Overview

### Core Pages
| Home Page | Video Resources |
|-----------|-----------------|
| ![Home](./assets/image-for-readme/home.png) | ![Video](./assets/image-for-readme/video.png) |

### Video Categories
| DSA Videos | MERN Videos |
|------------|-------------|
| ![DSA Videos](./assets/image-for-readme/video-dsa.png) | ![MERN Videos](./assets/image-for-readme/video-mern.png) |

### Learning Materials
| AI Resources | Handwritten Notes |
|--------------|-------------------|
| ![AI Resources](./assets/image-for-readme/ai.png) | ![Handwritten Notes](./assets/image-for-readme/handwritten.png) |

| Topic Notes | Previous Papers |
|-------------|-----------------|
| ![Notes](./assets/image-for-readme/notes.png) | ![Papers](./assets/image-for-readme/paper.png) |

### Templates & Authentication
| Portfolio Templates | Login Page |
|---------------------|------------|
| ![Portfolio](./assets/image-for-readme/porfolio.png) | ![Login](./assets/image-for-readme/login.png) |

| Signup Page |
|-------------|
| ![Signup](./assets/image-for-readme/signup.png) |

---

## 🚀 Features

### For Students
- **Course Catalog**: Browse and search through various technical courses (DSA, MERN, Flutter, etc.).
- **Study Space**: A dedicated area for users to access their purchased courses and materials.
- **Resource Hub**: 
  - **Handwritten Notes**: High-quality notes from top students and educators.
  - **Video Resources**: Curated video content for deep dives into specific topics.
  - **AI Resources**: Tools and links to leverage AI in development.
  - **Previous Papers**: Access to past exam and interview questions.
- **Portfolio Templates**: Professional templates to showcase your developer journey.
- **Secure Authentication**: JWT-based login and registration.

### For Teachers & Admins
- **Dashboard Stats**: Real-time statistics on users, courses, and revenue.
- **Course Management**: Create, update, and delete course listings.
- **Payment Verification**: Review and approve manual payments/enrollments.
- **User Management**: Monitor and manage user access.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt.js.
- **Media**: Cloudinary (for image/document storage).

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account (for file uploads)

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abhijayshah/catcatchcode.git
   cd catcatchcode
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install --legacy-peer-deps
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### Seed Data
To populate the database with initial sample data:
```bash
cd backend
node seeder.js
```

## 📂 Project Structure

```text
catcatchcode/
├── assets/             # Images and workflow diagrams for README
├── backend/            # Express.js server
│   ├── config/         # DB and Cloudinary configs
│   ├── controllers/    # Route logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── utils/          # Helper functions
└── frontend/           # React application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # Global state management
    │   ├── pages/      # Main application views
    │   └── services/   # API communication (Axios)
```

## 🛡️ Security Best Practices
- CORS enabled for secure cross-origin requests.
- Environment variables for sensitive configuration.
- Password hashing using `bcryptjs`.
- Protected routes for authenticated users and admins.

## 🤝 Collaboration & Contributing
This project is developed collaboratively across multiple GitHub accounts. 

### For Collaborators
1. **Pull often**: Always `git pull origin main` before starting work.
2. **Feature Branches**: Create a branch for new features `git checkout -b feature/name`.
3. **Commit Messages**: Use clear, descriptive commit messages.

## 📄 License
This project is licensed under the ISC License.
