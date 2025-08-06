# Sompo UK IT Innovation Hub

A modern, interactive website showcasing Sompo Insurance's UK IT Innovation Hub capabilities, featuring AI Gateway projects, team information, and innovation initiatives.

![Sompo Innovation Hub](./public/sompo-logo.svg)

## 🚀 Features

- **Modern React Application** - Built with React 18, Vite, and modern development practices
- **Responsive Design** - Fully responsive across all device sizes
- **Smooth Animations** - Beautiful animations powered by Framer Motion
- **AI Gateway Showcase** - Comprehensive overview of AI use cases and platform architecture
- **Team Profiles** - Meet the innovation team and their expertise
- **Project Tracking** - Current projects with progress indicators
- **Ideas Portal** - Submit and track innovation ideas
- **Professional Branding** - Consistent Sompo brand colors and styling
- **Quote Generation** - Generate branded quote documents using the 2025 renewal schedule template
- **Rating Modal** - Comprehensive rating and pricing analysis interface

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS, Autoprefixer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chrisrogers/sompo-ai-lab.git
   cd sompo-ai-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
sompo_ai_lab/
├── public/
│   ├── sompo-logo.svg
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Toast.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── HoverCard.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── PageTransition.jsx
│   │   └── AnimatedCounter.jsx
│   ├── hooks/
│   │   └── useToast.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AIGateway.jsx
│   │   ├── Projects.jsx
│   │   ├── Team.jsx
│   │   ├── Ideas.jsx
│   │   └── About.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Red**: `#E10032`
- **Dark Red**: `#750006`
- **Gray Scale**: Custom gray palette for backgrounds and text

### Typography
- **Font Family**: Inter (system fallback: system-ui, sans-serif)
- **Responsive Text**: Fluid typography scaling across breakpoints

### Components
- **Animations**: Smooth transitions and micro-interactions
- **Cards**: Consistent card styling with hover effects
- **Buttons**: Multiple button variants with proper accessibility
- **Forms**: Enhanced form validation and user feedback

## 📱 Pages Overview

### 🏠 Home
- Hero section with animated statistics
- Current projects overview
- AI Gateway integration showcase
- Call-to-action for idea submissions

### 🧠 AI Gateway
- Comprehensive use cases by priority (73 total)
- Platform architecture overview
- Technical specifications
- Real-time processing capabilities

### 🚀 Projects
- 6 active innovation projects
- Progress tracking with animated bars
- Technology stack for each project
- Project roadmap timeline

### 👥 Team
- Innovation team member profiles
- 4-phase MVP development process
- Leadership section featuring Brad O'Connor (UK CIO)
- "Why Our Process Works" benefits

## 📄 Quote Generation

The application includes a quote generation feature that uses the 2025 renewal schedule template with Sompo branding.

### How It Works
1. **Rating Process**: Complete the rating process using the comprehensive rating modal
2. **Generate Quote**: Click "Generate Quote" button after rating is complete
3. **Download**: The system will download a Word document with the insured's name and submission ID

### Features
- **Automatic Naming**: Quote files are automatically named with the format: `Quote_[InsuredName]_[SubmissionID].docx`
- **Template Based**: Uses the official 2025 Renewal Schedule template stored in `/public`
- **Multiple Access Points**: 
  - Generate quotes from the Submission Detail page
  - Download existing quotes from the Submissions list page
- **Toast Notifications**: Success/error notifications for quote generation

### Template Location
The quote template is stored at: `/public/2025 Renewal Schedule - Les Ambassadeurs Ltd.docx`

### Usage Example
```javascript
// The quote generator utility handles the download
import { generateQuote } from './utils/quoteGenerator';

// Generate quote with submission data
await generateQuote(submission, ratingData);
```

### 💡 Ideas
- Innovation idea submission form
- Inspiration areas for contributions
- Recent ideas showcase
- Category-based submission system

### 🏢 About
- Company history and values
- Office locations (London HQ, Manchester)
- Core values with visual representations
- Contact information and engagement options

## 🔧 Configuration

### Vite Configuration
- React plugin enabled
- Fast refresh for development
- Optimized build output

### Tailwind Configuration
- Custom Sompo color palette
- Extended gray scale
- Responsive breakpoints
- Custom utilities for gradients

### ESLint Configuration
- React-specific rules
- Hook dependencies checking
- Accessibility linting

## 👨‍💻 Development Team

**Chris Rogers** - AI Specialist & Developer  
📧 chris@starsite.digital

### Team Members Featured
- **Brad O'Connor** - UK CIO & Technology Leader
- **Mike Constantin** - Solutions Architect & AI Specialist  
- **Miguel Palacios** - Data Scientist & AI Specialist
- **Elliot Charing** - Business Analyst

## 📄 License

This project is proprietary to Sompo Insurance and intended for internal use.

## 🤝 Contributing

This is an internal Sompo project. For questions or contributions, please contact the development team.

## 📞 Support

For technical support or questions about this application:
- **Email**: chris@starsite.digital
- **Internal**: Contact the UK IT Innovation Hub team

---

*Built with ❤️ for Sompo Insurance UK IT Innovation Hub* 