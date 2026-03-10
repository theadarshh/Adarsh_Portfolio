# Adarsh R — Portfolio v3.0

> Dark electric blue premium portfolio. React + Spring Boot.

## 🚀 Quick Start

### Backend
```bash
cd backend
# Add your resume PDF to uploads/ directory
# mkdir -p uploads && cp ~/YourResume.pdf uploads/resume.pdf

mvn spring-boot:run
# → http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## 📁 Structure
```
portfolio-v2/
├── frontend/               React + Vite + Tailwind + Framer Motion
│   └── src/
│       ├── data/content.js  ← Edit all content here
│       ├── components/      One folder per section
│       └── services/api.js  ← All backend calls
└── backend/                Spring Boot 3 / Java 17
    └── src/main/java/com/adarshportfolio/
        ├── controller/     REST endpoints
        ├── service/        Business logic
        ├── scraper/        LeetCode + GitHub scrapers
        ├── scheduler/      Daily refresh cron jobs
        ├── model/          JPA entities
        └── repository/     Spring Data repos
```

---

## 📋 Checklist Before Going Live

- [ ] Upload your photo: `POST /api/profile/image` with `multipart/form-data`
- [ ] Place resume at `backend/uploads/resume.pdf`
- [ ] Update testimonials in `src/data/content.js` with real quotes
- [ ] Set `VITE_API_BASE` in frontend `.env` to your deployed backend URL
- [ ] (Optional) Add GitHub token in `application.properties` for higher rate limits

---

## 🌐 API Endpoints

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| GET    | /api/leetcode/latest | Cached LeetCode stats        |
| POST   | /api/leetcode/refresh| Force refresh                |
| GET    | /api/github/latest   | GitHub profile stats         |
| GET    | /api/github/repos    | Top 6 repos                  |
| POST   | /api/contact         | Submit contact form          |
| GET    | /api/profile/image   | Serve profile photo          |
| POST   | /api/profile/image   | Upload profile photo         |
| GET    | /api/resume/download | Download/view resume PDF     |

---

## 🖌 Content Editing

**All content lives in one file:** `frontend/src/data/content.js`

- `PROFILE` — name, role, tagline, bio, links
- `SKILLS` — tech stack with icons
- `PROJECTS` — all projects including ReDiscoverU
- `EDUCATION` + `CERTIFICATIONS`
- `TESTIMONIALS` — replace placeholder quotes with real ones

---

## 🚢 Deploy

**Frontend (Netlify)**
```bash
cd frontend
npm run build
# Deploy dist/ to Netlify
# Set VITE_API_BASE env var in Netlify dashboard
```

**Backend (Any Java hosting)**
```bash
cd backend
mvn package -DskipTests
java -jar target/portfolio-backend-2.0.0.jar
```

---

Built with ☕ Java + ⚛️ React by Adarsh R

---

## v3 Additions

### GitHub Screenshot
Drop your screenshot at: `frontend/public/github-dashboard.png`
The GitHub section will automatically display it inside a glass card.

### Profile Image
Upload via API: `POST /api/profile/image` with multipart/form-data
Or place it at: `backend/uploads/profile.jpg` (or .png)

### LeetCode Stats
Stats are now hardcoded to accurate values (250+/100+/120+/25+).
Edit in `frontend/src/data/content.js` → `LEETCODE_STATS`
