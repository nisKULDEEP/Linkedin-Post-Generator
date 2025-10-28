# LinkedIn Post Drafter 🚀

![A screenshot of the LinkedIn Post Drafter app showing the input form, the post editor, and the live preview.](https://i.imgur.com/3g7F9oT.png)

A creative, doodle-themed AI tool to help you draft viral-worthy LinkedIn posts in seconds. This project includes a V1 web application and a powerful V2 browser extension.

It operates on a **"Bring Your Own Key" (BYOK)** model, meaning you can run it locally or deploy it yourself without any server-side costs.

---

## V1: Web Application

The original version of the app, which runs as a standalone website.

**Live Demo:** [https://thevectorcamp.in/](https://thevectorcamp.in/)

### ✨ V1 Features

-   **🤖 AI-Powered Text & Image Generation:** Uses **Gemini 2.5 Pro** for text and **Nano Banana** for unique, doodle-style graphics.
-   **🔑 Bring Your Own Key (BYOK):** Use your own free Google AI Studio API key, stored securely in your browser's local storage.
-   **✍️ Rich Text Editor & Live Preview:** A custom editor converts **bold** and *italic* text to Unicode, with a realistic preview.
-   **🔗 Post Directly to LinkedIn:** A streamlined workflow to download your image and open the LinkedIn composer with your text pre-filled.
-   **💧 Branded Images:** All graphics are automatically watermarked with `thevectorcamp.in`.

---

## V2: Browser Extension (New!)

A powerful browser extension that brings the post drafter directly into your LinkedIn workflow. The user never has to leave LinkedIn!

### ✨ V2 Features

-   **💡 Three Generation Modes:**
    1.  **Analyze & Suggest:** Automatically scrapes your last 10 posts for context and suggests a new post idea.
    2.  **Custom Prompt:** Provide a specific topic for the AI to write about.
    3.  **Combined Mode:** Provide a topic, and the AI uses your post history to match your unique tone and style.
-   **🤖 Automated Context Gathering:** No more manual copy-pasting! The extension uses a content script to automatically read and analyze your recent posts directly from your LinkedIn profile page.
-   ** seamlessly Integrated Workflow:** Generate, edit, and post directly from a popup while on LinkedIn.
-   **All the great features from V1:** Includes BYOK (using `chrome.storage`), rich text editing, realistic previews, and the direct-to-LinkedIn posting flow.

---

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript
-   **Styling:** Tailwind CSS
-   **AI:** Google Gemini API (`@google/genai`)
-   **Extension:** Web Extension APIs (`chrome.storage`, `chrome.scripting`)

---

## 🚀 Getting Started

### V1: Running the Web App Locally

Follow these instructions to run the V1 web application on your local machine.

#### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   `npm` or `yarn` package manager

#### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/linkedin-post-drafter.git
    cd linkedin-post-drafter
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Get your Google AI Studio API Key:**
    -   Visit [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Click "**Create API key in new project**".
    -   Copy the generated API key. It's free!

4.  **Run the development server:**
    This project is configured to work with Vite. Run the following command:
    ```sh
    npm run dev
    # or
    yarn dev
    ```
    This will start the application on a local server, usually `http://localhost:5173`.

5.  **Use the App:**
    -   Open the app in your browser.
    -   You will be prompted to enter your Google AI Studio API key. Paste the key you copied and click "Save".
    -   You're all set!

---

### V2: Running the Browser Extension Locally

Follow these instructions to load the V2 extension into your browser for testing. **No build step is required!**

#### Prerequisites

-   A Chromium-based browser like Google Chrome, Microsoft Edge, or Brave.

#### Loading the Extension in Your Browser (using Chrome as an example)

1.  **Open the Extension Management page:**
    -   Navigate to `chrome://extensions` in your Chrome browser.

2.  **Enable Developer Mode:**
    -   In the top right corner of the page, toggle the "**Developer mode**" switch to be **On**.

3.  **Load the extension:**
    -   Click the "**Load unpacked**" button that appears on the top left.
    -   A file selection dialog will open. Navigate to this project's directory and select the **`extension`** folder.
    -   Click "Select Folder".

4.  **Done!** The "LinkedIn Post Drafter (Extension)" should now appear in your list of extensions. Pin it to your toolbar for easy access!

5.  **Use the Extension:**
    -   Navigate to [LinkedIn](https://www.linkedin.com).
    -   Click the extension icon in your toolbar.
    -   The first time you open it, it will ask for your Google AI Studio API key. Save your key.
    -   To use the "Analyze" or "Combined" modes, first navigate to your own profile page where your posts are visible.
    -   Start generating!