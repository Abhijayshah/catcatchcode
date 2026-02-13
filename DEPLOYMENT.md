# Deployment Guide for CatCatchCode 🚀

This guide provides step-by-step instructions on how to deploy the CatCatchCode MERN stack application to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Environment Variables Summary](#environment-variables-summary)
- [Post-Deployment Verification](#post-deployment-verification)

---

## Prerequisites
1. **MongoDB Atlas**: A live MongoDB database cluster.
2. **Cloudinary**: An account for image and document storage.
3. **GitHub**: Your code must be pushed to a GitHub repository.
4. **Accounts**: Sign up for [Render](https://render.com/) and [Vercel](https://vercel.com/).

---

## Backend Deployment (Render)

The project includes a `render.yaml` file in the `backend/` directory, making it optimized for Render's "Blueprint" or manual web service deployment.

### Steps:
1. Log in to [Render](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Name**: `catcatchcode-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add the **Environment Variables** (see below).
6. Click **Create Web Service**.

---

## Frontend Deployment (Vercel)

The frontend is built with Vite and includes a `vercel.json` to handle client-side routing.

### Steps:
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Set the following configurations:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add the **Environment Variables**:
   - `VITE_API_URL`: Your deployed Backend URL (e.g., `https://catcatchcode-backend.onrender.com/api`)
6. Click **Deploy**.

---

## Environment Variables Summary

### Backend (`backend/.env` on Render)
| Key | Description |
| :--- | :--- |
| `PORT` | Set to `5001` (Render usually handles this automatically) |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A long, secure random string for token signing |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary Cloud Name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API Secret |
| `NODE_ENV` | Set to `production` |

### Frontend (`frontend/.env` on Vercel)
| Key | Description |
| :--- | :--- |
| `VITE_API_URL` | The full URL to your deployed backend API |

---

## Post-Deployment Verification
1. **API Check**: Visit your backend URL (e.g., `https://catcatchcode-backend.onrender.com/`). You should see "API is running...".
2. **CORS**: Ensure the backend allows requests from your Vercel frontend URL. You might need to update the CORS configuration in `backend/index.js` if you've restricted it to specific origins.
3. **Database**: Check MongoDB Atlas to ensure new users or data can be written from the production environment.
4. **Storage**: Test an image upload (e.g., through the Admin Panel) to verify the Cloudinary integration.

---

Created with ❤️ by the CatCatchCode Team.
