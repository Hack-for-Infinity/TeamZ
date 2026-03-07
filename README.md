🧠 AI Reading Assistant – NeuroInclusive Web
👥 Team Members
Name	                      GitHub Username
Bhukya Gopi	                Bhukyagopi
Godari Vennela	            Vennela-go
Kalvakuntla Sathwika        -

❓ Problem Statement

Most digital content on the web is designed for the average reader, but not everyone processes text in the same way.
People with ADHD and Dyslexia often struggle with:
Large walls of text
Losing track of reading lines
Letter confusion (b/d, p/q)
Distractions from ads and sidebars
Difficulty extracting key information from long articles
These challenges make reading online content mentally exhausting and inefficient.
Our project aims to make the web more accessible and readable for neurodivergent users.

🏗️ System Architecture / Design
The project is implemented as a Chrome Extension that dynamically modifies webpage content.

Architecture Flow:
User
 ↓
Chrome Extension Popup
 ↓
Content Script Injection
 ↓
Webpage DOM Manipulation
 ↓
Accessibility Features Applied

Components
Popup Interface
Provides buttons for different accessibility features.
Content Script
Injected into webpages to modify text and layout.

Web APIs
Used for text-to-speech and webpage manipulation.

🛠️ Technologies Used
Frontend:
HTML
CSS
JavaScript

Browser Platform
Chrome Extension API
Accessibility Tools
Web Speech API (Text-to-Speech)

Development Tools:
VS Code
Git
GitHub

⭐ Key Features
🧠 Bionic Reading
----Highlights the first part of each word to create visual anchors and guide eye movement.

🎯 Focus Mode
-----Removes distractions like ads, sidebars, and unnecessary elements from the webpage.

📑 AI Page Summarizer
-----Condenses long articles into 5 key bullet points to help users quickly understand the content.

📖 Line Highlighter
-----Highlights one reading line at a time to help users track their reading position.

🔊 Read Aloud
-----Uses text-to-speech to read webpage content aloud for users who prefer listening.

🧾 Sentence Reader
-----Allows users to read sentence by sentence to reduce cognitive overload.

🔢 Highlight Digits
-----Highlights all numbers on the page for better visibility.

🧹 Remove Distractions
-----Simplifies webpage layout to improve readability.

⚙️ How It Works
The user installs the Chrome extension.
The user opens any webpage.
The extension popup provides multiple accessibility options.
When a feature is selected:
A content script is injected into the webpage
The script modifies the DOM structure and text formatting
Accessibility features such as Bionic Reading, Focus Mode, or Text-to-Speech are applied instantly.
This allows the extension to work on any webpage without modifying the original website code.

🚀 How to Run
1️⃣ Clone the Repository
git clone https://github.com/Hack-for-Infinity/TeamZ.git
2️⃣ Open the Project
cd TeamZ
3️⃣ Load Extension in Chrome

Open Google Chrome
Go to:
chrome://extensions
Enable Developer Mode
Click Load Unpacked
Select the project folder
4️⃣ Use the Extension
Open any website
Click the extension icon
Activate features like:
Bionic Reading
Focus Mode
Summarize Page
Read Aloud

🌍 Impact
This project improves digital accessibility for people with ADHD and Dyslexia, helping them:
Read faster
Focus better
Reduce cognitive overload
Access information more easily
By making the web more readable, we move closer to a more inclusive internet for everyone.
