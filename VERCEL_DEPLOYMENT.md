# 🚀 GrihGO Vercel Deployment Guide

Complete guide to deploy GrihGO website on Vercel for testing and production.

---

## 📋 Prerequisites

- ✅ GitHub account with the repository pushed
- ✅ Vercel account ([Sign up free](https://vercel.com/signup))
- ✅ Node.js 18+ installed locally

---

## 🎯 Quick Deploy (Recommended)

### Option 1: One-Click Deploy via GitHub

1. **Go to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click **"Add New Project"**

2. **Import Repository**
   - Connect your GitHub account
   - Find and select `Nir-Bhay/Grihgo`
   - Click **"Import"**

3. **Configure Build Settings**
   
   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | Vite |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |
   | **Install Command** | `npm install` |

4. **Deploy**
   - Click **"Deploy"**
   - Wait 1-2 minutes for build completion
   - 🎉 Your site is live!

---

## ⚙️ Vercel Configuration

Create `vercel.json` in your project root for optimal configuration:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "name": "grihgo",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/(.*)\\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🖥️ CLI Deployment Method

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy (Preview)

```bash
cd grihgo-website
vercel
```

### Step 4: Deploy to Production

```bash
vercel --prod
```

---

## 🔧 Environment Variables (Optional)

If your project requires environment variables:

1. Go to **Project Settings** → **Environment Variables**
2. Add your variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_API_URL` | Your API URL | Production, Preview, Development |
| `VITE_APP_NAME` | GrihGO | All |

---

## 🔄 Automatic Deployments

Once connected to GitHub:

| Branch | Deployment Type | URL |
|--------|-----------------|-----|
| `main` | Production | `grihgo.vercel.app` |
| `develop` | Preview | `grihgo-develop-xxx.vercel.app` |
| Pull Requests | Preview | Auto-generated |

---

## 🌐 Custom Domain Setup

### Add Custom Domain

1. Go to **Project Settings** → **Domains**
2. Enter your domain (e.g., `grihgo.com`)
3. Click **"Add"**

### DNS Configuration

Update your domain's DNS records:

**For Root Domain (grihgo.com):**
```
Type: A
Name: @
Value: 76.76.19.19
```

**For Subdomain (www.grihgo.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📊 Performance Optimization

Vercel automatically provides:

- ✅ **Global CDN** - Content served from edge locations
- ✅ **SSL/TLS** - Free HTTPS certificates
- ✅ **Brotli Compression** - Optimized file sizes
- ✅ **HTTP/2** - Faster loading
- ✅ **Edge Caching** - Reduced latency

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Check local build first
npm run build

# Common fixes:
npm install
rm -rf node_modules
npm install
```

### 404 Errors on Routes

Ensure `vercel.json` has the rewrites configured:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Assets Not Loading

Check paths in HTML files:
- ✅ Use `/src/css/...` (absolute from root)
- ❌ Avoid `./src/css/...` (relative paths)

---

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: [Report bugs](https://github.com/Nir-Bhay/Grihgo/issues)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

<div align="center">

**Ready to deploy? Let's go! 🚀**

</div>
