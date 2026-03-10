# Portfolio v4 — Setup Instructions

## 1. Profile Photo

Copy your photo file into the frontend public folder:

Source:  C:\Users\admin\Desktop\ADARSH\Adarsh\Adarsh.png
Target:  portfolio-v4/frontend/public/adarsh.png

The image MUST be named exactly: adarsh.png
Place it directly in the `public/` folder (not in src/).

Once placed, the Hero section will automatically display it with
a drop-shadow glow effect. No code changes needed.

## 2. Resume

Resume buttons now point directly to your Google Drive file.
No file copying needed — works immediately after download.

- Download CV → direct Google Drive download
- Preview Resume → opens in-browser preview

If you want to update the resume link, edit this line in:
  frontend/src/components/Resume/Resume.jsx

  const DRIVE_FILE_ID = '1XVC2CFs0I1yplomyr7rC_2MNokMwwChr'

Replace the ID with the new Google Drive file ID from your share URL.

## 3. Running the project

Frontend:
  cd frontend
  npm install
  npm run dev

Backend (optional — resume/image now work without it):
  cd backend
  mvn spring-boot:run
