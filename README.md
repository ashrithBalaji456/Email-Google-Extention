📧 Email Writer Assistant – Chrome Extension

An AI-powered Email Reply Generator that integrates directly into Gmail and helps you draft professional replies instantly using AI.

🚀 Features

✨ Generates AI-based email replies inside Gmail

⚡ Works automatically on mail.google.com

🔐 Secure backend integration

🧠 Simple, lightweight Chrome Extension (Manifest V3)

🗂️ Project Structure

Make sure your project folder looks like this:

email-writer-extension/
│
├── manifest.json
├── content.js
├── content.css
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md

📄 Manifest Configuration

This extension uses Manifest V3 with the following core settings:

Runs on Gmail

Injects content.js and content.css

Communicates with backend:

https://email-reply-backend-zpnv.onrender.com

🧩 How to Install the Extension in Chrome (Step-by-Step)
✅ Step 1: Download or Clone the Project

Download ZIP from GitHub OR

Clone the repository:

git clone <your-repo-url>


Extract the folder if downloaded as ZIP.

✅ Step 2: Open Chrome Extensions Page

Open Google Chrome and go to:

chrome://extensions/

✅ Step 3: Enable Developer Mode

Turn ON the toggle in the top-right corner labeled Developer mode

✅ Step 4: Load the Extension

Click Load unpacked

Select the project folder:

email-writer-extension/


Click Select Folder

✅ The extension should now appear in your extensions list.

✅ Step 5: Verify Installation

You should see Email Writer Assistant listed

The extension icon will appear in the Chrome toolbar

If hidden, click the Extensions (🧩) icon and pin it

✉️ How to Use the Extension

Open Gmail
👉 https://mail.google.com

Open any email

The extension automatically injects AI reply features

Click the assistant button to generate a reply

Edit or send the generated email 🚀

🔐 Permissions Used
Permission	Purpose
activeTab	Access current Gmail tab
storage	Save user preferences
mail.google.com	Inject Gmail content
Backend API	Generate AI replies
🛠️ Troubleshooting
❌ Extension not showing?

Make sure Developer mode is ON

Reload the extension

Refresh Gmail tab

❌ Not working inside Gmail?

Ensure URL starts with https://mail.google.com

Check Console (F12 → Console) for errors

Verify backend URL is reachable

📌 Version

v1.0
Manifest Version: 3

👨‍💻 Author

Ashrith Balaji Gudla
📧 Email: ashrithbalajigudla@gmail.com

⭐ Support

If you like this project:

⭐ Star the repository

🐛 Report issues

💡 Suggest improvements
