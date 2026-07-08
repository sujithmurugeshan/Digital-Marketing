# Akshu Medias

Split frontend and backend project for separate deployment.

## Structure

```
Frontend/
  src/
  index.html
  vite.config.js
  package.json

Backend/
  server.js
  package.json
```

## Frontend

```bash
cd Frontend
npm install
npm run dev
npm run build
```

For separate production deployment, set this frontend environment variable to the deployed backend endpoint:

```env
VITE_CONTACT_API_URL=https://your-backend-domain.com/api/contact
```

## Backend

```bash
cd Backend
npm install
npm run dev
```

Backend environment variables live in `Backend/.env` locally. In production, configure them in the backend hosting platform and set `ALLOWED_ORIGINS` to your deployed frontend domain.
