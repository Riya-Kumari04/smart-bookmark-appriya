# Smart Bookmark App

A web-based bookmark manager built with **Next.js (App Router)** and **Supabase**.  
Users can **add, view, and delete bookmarks**, with real-time updates and secure data storage.  
The app is deployed live on **Vercel**.

---

## 🌟 Live Demo

[Smart Bookmark App on Vercel](https://smart-bookmark-appriya.vercel.app/)

---

## 🛠 Technologies Used

- **Frontend / Framework:** Next.js (App Router)  
- **Backend / Database:** Supabase  
- **State Management:** React useState / Context API  
- **Version Control:** Git + GitHub  
- **Deployment:** Vercel  
- **Languages:** TypeScript, JavaScript, HTML, CSS  

---

## 🚀 Features

- Add bookmarks (URL, title, description)  
- View all saved bookmarks  
- Delete unwanted bookmarks  
- Real-time updates using React state management  
- Responsive design for mobile and desktop  

---

## 📦 Project Setup Instructions

```bash
# 1️⃣ Clone the repository
git clone <YOUR_REPO_URL>

# 2️⃣ Go to the project folder
cd smart-bookmark-app

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create a `.env.local` file in the root folder and add environment variables
# Open `.env.local` in a text editor and paste the following:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 5️⃣ Start the development server
npm run dev

# 6️⃣ Open your browser and visit
# http://localhost:3000

##  💡 Challenges Faced & Solutions

| Challenge | Solution |
|-----------|---------|
| Wrong project root folder | Navigated to the folder containing `package.json` before running Git or npm commands |
| Supabase POST errors (Bad Request) | Added `.env.local` with correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Vercel build error (`supabaseUrl is required`) | Added environment variables in Vercel Project Settings → Redeployed |
| React state not updating after CRUD operations | Correctly updated React state after insert/delete to trigger re-render |
| Git push confusion | Verified project root folder and initialized Git there |
