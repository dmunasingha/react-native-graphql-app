# 🧩 React Native GraphQL To-Do App

A ✨ full-stack mobile To-Do app ✨ built with **React Native**, **GraphQL**, **Apollo**, **PostgreSQL**, and more! It's fast, clean, and developer-friendly — perfect for learning or launching 🚀.

---

## 🔧 Tech Stack Toolbox 🧰

### 🖼️ Frontend

* ⚛️ React Native `0.79.4`
* 🚀 Expo SDK `53`
* 🔗 Apollo Client
* 💅 NativeWind (TailwindCSS for RN)
* 🎭 Reanimated for slick animations
* 🧱 GlueStack UI (optional)

### 🔙 Backend

* 🟢 Node.js + Express
* 📡 Apollo Server
* 🔍 GraphQL (Schema + Resolvers)
* 🔄 Prisma ORM
* 🛢️ PostgreSQL

---

## 🚀 Getting Started

### 🗂️ Folder Structure

```
react-native-graphql-app/
├── frontend/        # 📱 Mobile client
│   ├── App.js
│   ├── apollo/      # Apollo config
│   ├── components/  # Reusable UI
├── server/          # 🔧 Node GraphQL API
│   ├── src/
│   ├── prisma/      # DB schema & migrations
└── README.md
```

---

## 🔄 Quickstart Guide

### 📥 1. Clone the Repo

```bash
git clone https://github.com/dmunasingha/react-native-graphql-app.git
cd react-native-graphql-app
```

### 🧠 2. Backend Setup

```bash
cd server
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

🔗 GraphQL Playground: `http://localhost:4000/graphql`

### 📲 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

💡 Tip: Use Expo Go or an emulator for testing

> ⚠️ **Important:** Update Apollo client URI in `apollo/client.js`:

```js
uri: 'http://192.168.x.x:4000/graphql' // 👈 Use your LAN IP
```

---

## 🎯 Features Checklist

* ✅ Add / Toggle / Delete todos
* 🔁 Auto refetch with Apollo
* ✨ Beautiful styling with Tailwind
* 📲 Cross-platform (iOS/Android)
* 🔄 Prisma-backed DB
* ⏱️ Coming Soon: Offline mode
* 🌓 Coming Soon: Dark mode

---

## 📸 Screenshots

| 📋 List View  | 🛠️ Mutation Example |
| ------------- | -------------------- |
| *Coming soon* | *Coming soon*        |

---

## 🧪 Dev Tips

* 🧹 Clear Metro cache: `npx expo start -c`
* 🧬 Test GraphQL at: `http://localhost:4000/graphql`
* 🧑‍🔬 Use `npx prisma studio` to view data

---

## 🧨 Troubleshooting

* ❌ **Network request failed:** Use your real IP, not `localhost`
* ❌ **Unknown type "ID":** Match GraphQL types (use `Int!` if Prisma expects it)
* ❌ **Metro error:** All `import` statements must be at the top level

---

## 📄 License

🪪 Licensed under the **0BSD** license — totally open and flexible 💖

---

## 💡 Acknowledgements

* 🚀 [Apollo GraphQL](https://www.apollographql.com/)
* 🧬 [Prisma](https://www.prisma.io/)
* 📦 [Expo](https://expo.dev/)
* 🎨 [GlueStack UI](https://ui.gluestack.io/)

---

## 🙋‍♂️ Contact

Made with ❤️ by Dunith Munasingha
📧 munasingha.dunith@gmail.com(mailto:munasingha.dunith@gmail.com)
🌐 https://www.linkedin.com/in/dunith-munasingha/
