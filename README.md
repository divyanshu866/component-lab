<div align="center">

# ComponentLab

### The AI-first workspace for designing, generating, and iterating on frontend components.

Generate production-ready UI from natural language, refine it through conversational AI, edit it manually with an integrated code editor, and preview every change in real time.

</div>

<p align="center">
  <img src="./docs/landing.png" alt="ComponentLab Landing Page" width="100%">
</p>

---

> 🚧 **Currently in active development.**

---

# ✨ Features

- 🤖 Generate complete frontend components from natural language
- 🧠 Multi-turn conversational AI editing with context awareness
- 🎨 Generate production-ready HTML, CSS, and JavaScript
- 🧩 Multiple component styles and design presets
- ⚡ Stream AI-generated code directly into the editor
- 📝 Built-in Monaco editor with IDE-level syntax highlighting and code completion
- 🖥️ Live preview with sandboxed execution
- 📟 Integrated JavaScript console
- 📚 Persistent component library
- 💾 Save, organize, and revisit components
- 🗂️ Persistent AI conversation history
- 💬 Streaming chat with Markdown support
- ⌨️ Keyboard shortcuts for common actions

---

## 💻 AI Workspace

Generate frontend components with AI, inspect and edit the generated code, and see every change reflected instantly in the live preview.

<p align="center">
  <img src="./docs/workspace.png" alt="ComponentLab Workspace" width="100%">
</p>

---

## 💬 Conversational Editing

Refine existing components using natural language. ComponentLab maintains conversational context, allowing you to iteratively improve your UI without starting over.

<p align="center">
  <img src="./docs/conversational_editing.png" alt="Conversational Editing" width="100%">
</p>

---

# 🛠 Tech Stack

| Category      | Technology               |
| ------------- | ------------------------ |
| **Framework** | Next.js + React          |
| **Styling**   | Tailwind CSS             |
| **Editor**    | Monaco Editor            |
| **Database**  | PostgreSQL + Prisma      |
| **AI**        | Google Gemini            |
| **Streaming** | Server-Sent Events (SSE) |

---

# 🚀 Roadmap

- [ ] React & Vue component generation
- [ ] Mobile-optimized workspace
- [ ] Version history & rollback
- [ ] Component collections
- [ ] AI-powered design improvements
- [ ] Framework export
- [ ] Team collaboration
- [ ] Custom themes

---

## 🚀 Getting Started

### 1. Create `.env` file in root

```env
DATABASE_URL='postgres://'

AUTH_GITHUB_ID=''
AUTH_GITHUB_SECRET=''

AUTH_SECRET=""

GEMINI_API_KEY=""

AUTH_TRUST_HOST=true
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser by default.

---

<div align="center">

Made with ❤️ for frontend developers.

</div>
