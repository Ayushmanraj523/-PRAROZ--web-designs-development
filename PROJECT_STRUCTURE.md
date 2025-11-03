# PraRoz - Professional Project Structure

## 📁 Folder Structure

```
-PRAROZ--web-designs-development/
├── 📄 index.html                    # Main homepage
├── 📄 about.html                    # About page
├── 📄 service.html                  # Services page
├── 📄 design.html                   # Design portfolio page
├── 📄 contact.html                  # Contact page
├── 📄 README.md                     # Project documentation
├── 📄 PROJECT_STRUCTURE.md          # This file
│
├── 📁 public/                       # Public assets
│   ├── 📁 css/                      # Stylesheets
│   │   └── 📄 style.css             # Main stylesheet
│   │
│   ├── 📁 js/                       # JavaScript files
│   │   └── 📄 main.js               # Main JavaScript
│   │
│   ├── 📁 vendor/                   # Third-party libraries
│   │   ├── 📄 bootstrap.min.css     # Bootstrap CSS
│   │   └── 📄 bootstrap.bundle.min.js # Bootstrap JS
│   │
│   └── 📁 assets/                   # Static assets
│       ├── 📁 fonts/                # Font files
│       │   ├── 📄 fontawesome.min.css
│       │   └── 📄 google-fonts.css
│       │
│       └── 📁 images/               # Image files
│           └── 📄 background.jpg    # Background image
```

## 🎯 File Organization

### **HTML Files (Root Level)**
- All HTML pages are in the root directory for easy access
- Clean URLs without nested folders
- Professional naming convention

### **Public Directory**
- Contains all public-facing assets
- Organized by file type (css, js, assets)
- Vendor libraries separated from custom code

### **Assets Structure**
- **CSS**: Custom stylesheets
- **JS**: Custom JavaScript files  
- **Vendor**: Third-party libraries (Bootstrap, etc.)
- **Assets**: Static files (fonts, images)

## 🔗 Path References

All HTML files use relative paths:
- CSS: `public/css/style.css`
- JS: `public/js/main.js`
- Bootstrap: `public/vendor/bootstrap.min.css`
- Fonts: `public/assets/fonts/`

## 📋 Features

- ✅ No duplicate files
- ✅ Professional folder structure
- ✅ Organized by file type
- ✅ Clean separation of concerns
- ✅ Easy to maintain and scale
- ✅ Industry-standard organization

## 🚀 Usage

1. Open `index.html` in browser
2. Navigate between pages using menu
3. All assets load from organized structure
4. Ready for deployment or further development