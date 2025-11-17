#  TrueFeed

## Technology Stack

**Frontend Framework:**
- React 18.3.1
- Vite 6.0.5 (Build tool)

**Styling:**
- Tailwind CSS 3.4.17
- PostCSS 8.4.49
- Autoprefixer 10.4.20

**Routing:**
- React Router DOM 7.1.1

**Animations:**
- Framer Motion 11.15.0

**3D Graphics:**
- Three.js 0.171.0

**Additional Libraries:**
- Lucide React 0.468.0 (Icons)
- clsx 2.1.1 (Class name utilities)

**Development Tools:**
- ESLint 9.17.0
- Vite Plugin React 4.3.4

## Project Structure
```
truefeed-auth/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── common/
│   │   │   ├── Avatar.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── GhostCursor.jsx
│   │   │   ├── GhostCursor.css
│   │   │   ├── LiquidEther.jsx
│   │   │   ├── LiquidEther.css
│   │   │   └── PageTransition.jsx
│   │   ├── dashboard/
│   │   │   ├── AddStoryModal.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── CreatePostModal.jsx
│   │   │   ├── Post.jsx
│   │   │   ├── RightPanel.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Stories.jsx
│   │   │   └── StoryViewer.jsx
│   │   ├── profile/
│   │   │   ├── BannerHeader.jsx
│   │   │   ├── BioSection.jsx
│   │   │   ├── EditProfileModal.jsx
│   │   │   ├── PopularCollections.jsx
│   │   │   ├── ProfileSidebar.jsx
│   │   │   ├── TeamSection.jsx
│   │   │   └── UserPosts.jsx
│   │   ├── AuthPage.jsx
│   │   ├── FallingText.jsx
│   │   ├── LeftPanel.jsx
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── SignupPage.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (version 16.x or higher)
- npm (version 8.x or higher) or yarn (version 1.22.x or higher)
- Git (for version control)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/fullstack-course-pace/truefeed.git
cd truefeed
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```
