# Princy's Birthday Surprise Website ❤️🫀✨

A beautiful, romantic, emotional, and interactive birthday wishing web app created especially for **Princy**.

---

## 📁 Project Folder Structure

```text
Princy birthday wishes/
├── index.html                  # Main HTML file (6 interactive screens)
├── css/
│   └── style.css               # Romantic light pink theme & CSS custom styling
├── js/
│   └── script.js               # Central logic & editable CONFIG object
├── assets/
│   ├── couple-cover.jpg        # [PLACE YOUR MAIN COVER PHOTO HERE]
│   ├── photos/                 # [PLACE YOUR PHOTO GALLERY HERE]
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   ├── photo3.jpg
│   │   ├── photo4.jpg
│   │   ├── photo5.jpg
│   │   ├── photo6.jpg
│   │   ├── photo7.jpg
│   │   └── photo8.jpg
│   ├── songs/                  # [PLACE YOUR MP3 SONGS HERE]
│   │   ├── song1.mp3
│   │   ├── song2.mp3
│   │   └── song3.mp3
│   └── icons/
└── README.md
```

---

## 🛠️ How to Customize Content

All editable text, song details, captions, memory texts, and birthday letters are neatly organized inside **`js/script.js`** at the top under the `CONFIG` object!

### 1. Adding Her Birthday Date
Open `js/script.js` and edit:
```js
birthdayDate: "October 10th ✨", // Replace placeholder with her actual birthday date!
```

### 2. Adding Photos 📸
- Place your main couple photograph inside `assets/couple-cover.jpg`.
- Place 8 photos inside `assets/photos/` named `photo1.jpg`, `photo2.jpg` ... `photo8.jpg`.
- If any photo file is missing, an aesthetic black space frame with helper text is displayed automatically without breaking the layout!

Edit captions in `js/script.js`:
```js
photos: [
    { src: "assets/photos/photo1.jpg", caption: "Our first cute date ❤️" },
    { src: "assets/photos/photo2.jpg", caption: "Your gorgeous smile ✨" },
    // ...
]
```

### 3. Adding Songs 🎵
Place your MP3 music files into `assets/songs/`:
- `assets/songs/song1.mp3`
- `assets/songs/song2.mp3`
- `assets/songs/song3.mp3`

Update the titles and artists in `js/script.js`:
```js
songs: [
    { id: "song1", title: "Perfect", artist: "Ed Sheeran", src: "assets/songs/song1.mp3", icon: "🎵" },
    { id: "song2", title: "Lover", artist: "Taylor Swift", src: "assets/songs/song2.mp3", icon: "🎶" },
    { id: "song3", title: "Until I Found You", artist: "Stephen Sanchez", src: "assets/songs/song3.mp3", icon: "🎧" }
]
```

### 4. Adding 4 Flip Memories 💗
Open `js/script.js` and edit the `memories` array:
```js
memories: [
    "That late night call when we talked for hours...",
    "The way you laugh at my silly jokes...",
    "Our favorite trip together...",
    "Every moment spent with you is a blessing..."
]
```

### 5. Customizing the Love Letter 💌
Edit `CONFIG.letter` in `js/script.js` to change the letter text.

---

## 🚀 How to Run Locally

You can run this project using any local web server:

### Option A: Python HTTP Server (Built-in)
Run the following command in your terminal inside the project directory:
```bash
python3 -m http.server 8080
```
Then open your browser and go to: `http://localhost:8080`

### Option B: VS Code Live Server Extension
1. Open the project folder in VS Code.
2. Right click `index.html` and select **"Open with Live Server"**.

---

## 🌐 How to Deploy Online & Share Link with Princy

To share the web link with Princy on her birthday, host it using any free static host:

### Method 1: Netlify (Easiest & Fastest)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop your `Princy birthday wishes` folder into the upload box.
3. Netlify will generate a free link like `https://princy-birthday-surprise.netlify.app`.

### Method 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project folder and follow instructions.

### Method 3: GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Branch**, select `main` and click **Save**.
4. Your website will be live at `https://<your-username>.github.io/<repo-name>`.

---

Made with ❤️ for Princy!
