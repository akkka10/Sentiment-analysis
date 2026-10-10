SENTIMENT ANALYSIS
==================

A sentiment analysis web app. The React + Vite frontend sends text to a
Node.js/Express backend, which analyzes the sentiment and stores each result
in MongoDB Atlas.


PROJECT STRUCTURE
-----------------
backend/     Express server, Mongoose model, sentiment analysis route
frontend/    React + TypeScript + Vite user interface
readme.txt   This file


PREREQUISITES
-------------
- Node.js (LTS version recommended)
- A MongoDB Atlas account and a free M0 cluster
- Git


SETUP
-----

1. Clone the repository

   git clone https://github.com/akkka10/Sentiment-analysis.git
   cd Sentiment-analysis

2. MongoDB Atlas

   a. Create a cluster (M0 Free tier).
   b. Under Database Access, create a database user with read and write
      permissions.
   c. Under Network Access, allow your IP address (or 0.0.0.0/0 for
      development only).
   d. Click Connect > Drivers > Node.js and copy the connection string.

3. Backend

   cd backend
   npm install

   Create a file named .env in the backend folder:

   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/sentiment?retryWrites=true&w=majority
   PORT=5000

   Notes on MONGO_URI:
   - Do not include a port number in a mongodb+srv:// URI.
   - URL-encode special characters in the password (for example, # becomes
     %23, @ becomes %40).
   - Do not commit this file. It must be listed in .gitignore.

   Start the backend:

   npm start

   Expected output:
   Node.js server running on http://localhost:5000
   MongoDB connected successfully.

4. Frontend

   Open a second terminal:

   cd frontend
   npm install
   npm run dev

   Open the address shown in the terminal (usually http://localhost:3000 or
   http://localhost:5173).


API
---

POST http://localhost:5000/api/analyze
Body (JSON):     { "text": "your text here" }
Response (JSON): { "sentiment": "positive" | "negative" | "neutral", "score": number }

Each successful request is saved to the "analyses" collection in MongoDB.


HOW ANALYSIS WORKS
------------------

Sentiment analysis runs inside the Node backend using the "sentiment" npm
package, a word-list based model. It returns:

- sentiment: "positive" if the score is above 0, "negative" if below 0,
  otherwise "neutral"
- score: the comparative score, capped at 1 in absolute value

This replaced an earlier design that forwarded requests to a separate Flask
service. The Flask dependency has been removed.


CHANGES MADE
------------

Backend
- Replaced the Flask API call in backend/index.js with local analysis using
  the "sentiment" package.
- Analysis results are saved to MongoDB through the Analysis model.
- Environment variables are loaded from backend/.env with dotenv.

Frontend
- Changed the Sentiment enum in frontend/types.ts to lowercase values
  ('positive', 'negative', 'neutral') so they match the backend response.
  Previously the values were capitalized, so the lookup in
  AnalysisResultCard.tsx returned undefined and the page crashed.


KNOWN ISSUES
------------

- A 404 error may still occur in the browser console when the frontend calls
  a URL that does not match a backend route. Check that the frontend calls
  http://localhost:5000/api/analyze.
- If the frontend reads a field other than "score" or "sentiment", update it
  to match the backend response.


TROUBLESHOOTING
---------------

- "MongoParseError: mongodb+srv URI cannot have port number"
  Remove the :port from MONGO_URI.

- "MongoServerSelectionError" or authentication errors
  Check the database user's password, URL-encode special characters, and
  confirm your IP is allowed under Network Access.

- "running scripts is disabled" in PowerShell
  Run once: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

- Blank page in the frontend
  Open the browser console (F12) and check the first error. Usually this
  means the data shape from the backend does not match the frontend types.


SECURITY
--------

- Never commit .env files or database passwords.
- Make sure .gitignore includes:
    .env
    node_modules/
    venv/