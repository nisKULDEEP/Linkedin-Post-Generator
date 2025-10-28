# LinkedIn Post Drafter 🚀

![A screenshot of the LinkedIn Post Drafter app showing the input form, the post editor, and the live preview.](https://i.imgur.com/3g7F9oT.png)

A creative, doodle-themed AI tool to help you draft viral-worthy LinkedIn posts in seconds. This application leverages the power of the Google Gemini API to generate engaging, professional LinkedIn posts complete with custom, AI-generated graphics.

It operates on a **"Bring Your Own Key" (BYOK)** model, meaning you can run it locally or deploy it yourself without any server-side costs.

**Live Demo:** [https://thevectorcamp.in/](https://thevectorcamp.in/)

---

## ✨ Features

-   **🤖 AI-Powered Text Generation:** Uses **Gemini 2.5 Pro** to write compelling post copy with killer hooks, emojis, and relevant hashtags.
-   **🎨 AI-Powered Image Generation:** Leverages **Nano Banana (`gemini-2.5-flash-image`)** to create unique, colorful doodle-style graphics tailored to your post content.
-   **🔑 Bring Your Own Key (BYOK):** No sign-up required. Just use your own free Google AI Studio API key. Your key is stored securely in your browser's local storage.
-   **✍️ Rich Text Editor:** A custom-built editor that converts **bold** and *italic* text into the special Unicode characters that LinkedIn recognizes, making your posts stand out.
-   **🪄 Automatic Formatting:** The AI's Markdown suggestions (`**bold**`, `*italic*`) are automatically converted to formatted Unicode text upon generation.
-   **👀 Realistic Live Preview:** See exactly how your post will look on LinkedIn, including a realistic name/profile picture, engagement stats, and a clickable `...more` link for longer posts.
-   **🔗 Post Directly to LinkedIn:** A "Post on LinkedIn" button downloads your image and opens the LinkedIn composer with your post text pre-filled.
-   **🖼️ Optional Graphics:** Don't need an image? Simply toggle it off to generate a text-only post.
-   **💧 Branded Images:** All generated graphics are automatically watermarked with `thevectorcamp.in`.

---

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript
-   **Styling:** Tailwind CSS
-   **AI:** Google Gemini API (`@google/genai`)

---

## 🚀 Getting Started (Local Setup)

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   `npm` or `yarn` package manager

### Installation

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
    This project is configured to work with Vite. Run the following command to start the local server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```
    This will start the application on a local server, usually `http://localhost:5173`.

5.  **Use the App:**
    -   Open the app in your browser.
    -   You will be prompted to enter your Google AI Studio API key. Paste the key you copied in Step 3 and click "Save".
    -   You're all set! Start generating amazing LinkedIn posts.

---

## 💡 How It Works

1.  The user provides a topic and chooses whether to include a graphic.
2.  The app sends a detailed prompt to **Gemini 2.5 Pro** to generate the post text, instructing it to use a specific structure and Markdown for formatting.
3.  If an image is requested, the generated text is sent back to **Gemini 2.5 Pro** to create a highly descriptive image prompt tailored for a creative, doodle-style graphic.
4.  This new prompt is sent to the **Nano Banana (`gemini-2.5-flash-image`)** model, which generates the final image, complete with the `thevectorcamp.in` watermark.
5.  The app parses the generated Markdown text into Unicode and displays the post and image in an editor/preview layout.
6.  The user can make final edits, copy the text, and use the "Post on LinkedIn" button to publish.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License.