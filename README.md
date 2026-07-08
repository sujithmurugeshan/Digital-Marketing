# Akshu Medias

Frontend-only Vite project for Akshu Medias. Contact form submissions are sent directly through Web3Forms.

## Structure

```
Frontend/
  src/
  index.html
  vite.config.js
  package.json

```

## Frontend

```bash
cd Frontend
npm install
npm run dev
npm run build
```

For production deployment, set this frontend environment variable in your hosting platform:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```
