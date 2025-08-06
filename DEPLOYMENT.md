# Sompo Underwriting Workbench - Deployment Guide

## 🚀 Deployment Instructions

### Prerequisites
- Node.js 16+ and npm installed
- Git installed
- GitHub account with access to create repositories

### Local Setup & Testing

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Test Login Credentials

The application includes a simple authentication system with the following test accounts:

### Demo User
- **Username:** `demo`
- **Password:** `demo123`
- **Role:** User
- **Access:** Basic viewing and submission management

### Admin User
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Admin
- **Access:** Full system access including all features

### Underwriter
- **Username:** `underwriter`
- **Password:** `underwriter123`
- **Role:** Underwriter
- **Access:** Underwriting-specific features and rating tools

## 📦 GitHub Deployment

### Repository Setup
- **Repository:** https://github.com/rogit85/workbench
- **Author:** Chris Rogers (chris@starsite.digital)

### Deployment Steps

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sompo Underwriting Workbench"
   ```

2. **Add remote repository**
   ```bash
   git remote add origin https://github.com/rogit85/workbench.git
   ```

3. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

### GitHub Pages Deployment (Optional)

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default {
     base: '/workbench/',
     // ... other config
   }
   ```

4. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## 🌐 Vercel Deployment (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts to connect to GitHub repository**

## 🔧 Environment Variables

No environment variables are required for the basic setup. The application uses local storage for authentication state.

## 📱 Features Overview

### Authentication
- Login page with test credentials displayed
- Protected routes requiring authentication
- User menu with logout functionality
- Persistent login state using localStorage

### Main Features
- **Dashboard**: Overview of submissions and metrics
- **Submissions**: List and manage insurance submissions
- **Rating Modal**: Comprehensive rating and pricing analysis
- **Quote Generation**: Download branded quote documents
- **Reports**: Analytics and reporting features

### Quote Template
The quote template is located at `/public/2025 Renewal Schedule - Les Ambassadeurs Ltd.docx` and is automatically downloaded with the insured's name when generating quotes.

## 🛠️ Troubleshooting

### Common Issues

1. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear build cache: `rm -rf dist`

2. **Authentication issues**
   - Clear browser localStorage
   - Ensure using correct test credentials

3. **Quote download not working**
   - Check browser console for errors
   - Ensure template file exists in `/public` directory

## 📞 Support

For any deployment issues or questions:
- **Developer:** Chris Rogers
- **Email:** chris@starsite.digital
- **Repository:** https://github.com/rogit85/workbench

## 🔄 Updates

To update the deployed application:

1. Make changes locally
2. Test thoroughly
3. Commit changes: `git add . && git commit -m "Update description"`
4. Push to GitHub: `git push origin main`
5. If using Vercel, it will auto-deploy on push

## 📄 License

This application is proprietary software for Sompo Insurance UK Ltd.