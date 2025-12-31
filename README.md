# 🍽️ GrihGO - Bihar & Jharkhand's Own Food Delivery Platform

<div align="center">

![GrihGO Logo](./public/logo.png)

**Fresh Food. Fair Prices. Local Love.**

*बिहार का अपना फूड डिलीवरी ऐप*

[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

[🚀 Live Demo](https://grihgo.vercel.app) · [📖 Documentation](#documentation) · [🐛 Report Bug](https://github.com/Nir-Bhay/Grihgo/issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🖼️ Screenshots](#️-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🌐 Deployment](#-deployment)
- [📖 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎯 Core Features
| Feature | Description |
|---------|-------------|
| **Zero Hidden Charges** | Complete transparency in pricing - what you see is what you pay |
| **Local Restaurant Discovery** | Curated list of authentic local restaurants in Bihar & Jharkhand |
| **City Voting System** | Vote for your city to be next on GrihGO launch list |
| **Fast Delivery** | 30-minute delivery promise with real-time tracking |

### 🌟 User Experience
- 🎨 **Modern UI/UX** - Premium glassmorphism design with smooth animations
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🌙 **AOS Animations** - Beautiful scroll reveal effects
- 🎠 **Swiper Carousels** - Smooth touch-enabled sliders

### 📄 Website Pages
| Page | Description |
|------|-------------|
| 🏠 **Home** | Hero section, city voting, featured restaurants, testimonials |
| ℹ️ **About** | Company story, mission, team, and achievements |
| 🏙️ **Cities** | City-wise restaurant listings and upcoming cities |
| 🍽️ **Restaurants** | Full restaurant directory with filters |
| 📝 **Blog** | Food stories, tips, and updates |
| 🤝 **Partner With Us** | Restaurant partner registration |
| 🚴 **Delivery Partners** | Delivery driver registration and benefits |
| 🔒 **Transparency** | Zero hidden charges policy explained |
| ❤️ **Local Pride** | Celebrating local Bihar & Jharkhand culture |
| 💼 **Careers** | Job openings and company culture |
| 📞 **Contact/Help** | Customer support and FAQs |

---

## 🖼️ Screenshots

<div align="center">

### 🏠 Home Page
| Desktop View | Mobile View |
|:------------:|:-----------:|
| ![Home Desktop](https://via.placeholder.com/400x250.png?text=Home+Desktop) | ![Home Mobile](https://via.placeholder.com/180x320.png?text=Home+Mobile) |

### 🎨 Key Sections
| Hero Section | City Voting | Restaurants |
|:------------:|:-----------:|:-----------:|
| ![Hero](https://via.placeholder.com/260x180.png?text=Hero+Section) | ![Voting](https://via.placeholder.com/260x180.png?text=City+Voting) | ![Restaurants](https://via.placeholder.com/260x180.png?text=Restaurants) |

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|--------------|
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
| **Icons** | ![Lucide](https://img.shields.io/badge/Lucide_Icons-000000?style=flat&logo=lucide&logoColor=white) |
| **Animations** | ![AOS](https://img.shields.io/badge/AOS-FF5722?style=flat) |
| **Carousel** | ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat&logo=swiper&logoColor=white) |
| **Fonts** | ![Google Fonts](https://img.shields.io/badge/Inter-4285F4?style=flat&logo=googlefonts&logoColor=white) |

</div>

---

## 📁 Project Structure

```
grihgo-website/
│
├── 📄 index.html              # Landing page
├── 📄 about.html              # About GrihGO
├── 📄 blog.html               # Blog articles
├── 📄 careers.html            # Career opportunities
├── 📄 cities.html             # City listings
├── 📄 contact.html            # Help & support
├── 📄 delivery.html           # Delivery partner page
├── 📄 partner.html            # Restaurant partners
├── 📄 pride.html              # Local pride showcase
├── 📄 restaurants.html        # Restaurant directory
├── 📄 transparency.html       # Pricing transparency
│
├── 📂 src/
│   ├── 📂 css/
│   │   ├── global.css         # Global styles & variables
│   │   ├── header.css         # Navigation styles
│   │   ├── footer.css         # Footer styles
│   │   ├── home.css           # Home page styles
│   │   ├── about.css          # About page styles
│   │   ├── blog.css           # Blog page styles
│   │   ├── careers.css        # Careers page styles
│   │   ├── cities.css         # Cities page styles
│   │   ├── contact.css        # Contact page styles
│   │   ├── delivery.css       # Delivery partners styles
│   │   ├── partner.css        # Partner page styles
│   │   ├── pride.css          # Local pride styles
│   │   ├── restaurants.css    # Restaurants page styles
│   │   └── transparency.css   # Transparency page styles
│   │
│   ├── 📂 js/
│   │   └── ...                # JavaScript modules
│   │
│   └── main.js                # Main JavaScript entry
│
├── 📂 public/
│   └── logo.png               # Brand assets
│
├── 📄 package.json            # Project dependencies
├── 📄 vite.config.js          # Vite configuration
├── 📄 .gitignore              # Git ignore rules
└── 📄 README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager

### Installation

1️⃣ **Clone the repository**
```bash
git clone https://github.com/Nir-Bhay/Grihgo.git
cd Grihgo
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Start development server**
```bash
npm run dev
```

4️⃣ **Open in browser**
```
http://localhost:5173
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

<details>
<summary>📘 <b>Click to expand Vercel deployment guide</b></summary>

#### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nir-Bhay/Grihgo)

#### Option 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

#### Vercel Configuration

Create a `vercel.json` file in the root directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

</details>

---

## 📖 Documentation

### CSS Architecture

The project follows a **modular CSS architecture**:

| File | Purpose |
|------|---------|
| `global.css` | CSS variables, resets, utility classes, and base styles |
| `header.css` | Navbar, mobile menu, and navigation components |
| `footer.css` | Site footer and related elements |
| `[page].css` | Page-specific styles for each HTML page |

### CSS Variables

```css
:root {
  /* Primary Colors */
  --primary: #ff6b35;
  --primary-dark: #e55a2b;
  
  /* Typography */
  --font-family: 'Inter', sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
}
```

### JavaScript Features

- **Preloader** - Smooth page load animation (index.html only)
- **Navbar** - Sticky header with scroll effects
- **Mobile Menu** - Responsive hamburger menu
- **City Voting** - Interactive voting system
- **AOS Integration** - Scroll-triggered animations
- **Swiper Sliders** - Touch-enabled carousels

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style Guidelines

- Use meaningful class names following BEM methodology
- Keep CSS modular and page-specific
- Comment complex JavaScript logic
- Ensure mobile responsiveness for all new features

---

## 📬 Contact

<div align="center">

| Platform | Link |
|----------|------|
| **GitHub** | [@Nir-Bhay](https://github.com/Nir-Bhay) |
| **Email** | [contact@grihgo.com](mailto:contact@grihgo.com) |
| **Website** | [grihgo.com](https://grihgo.vercel.app) |

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

### Made with ❤️ for Bihar & Jharkhand

**ई हमर है!** | *This is ours!*

![Footer Wave](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24&height=100&section=footer)

</div>
