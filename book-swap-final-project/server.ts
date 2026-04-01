import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "bookswap-secret-key-2026";
const DB_FILE = path.join(__dirname, "db.json");

// Initial DB structure
const initialDb = {
  users: [],
  books: [],
  wishlist: []
};

async function getDb() {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    await fs.writeFile(DB_FILE, JSON.stringify(initialDb, null, 2));
    return initialDb;
  }
}

async function saveDb(db: any) {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static("uploads"));

  // Ensure uploads directory exists
  try {
    await fs.mkdir("uploads");
  } catch (e) {}

  // --- API Routes ---

  // Auth
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;
    const db = await getDb();
    if (db.users.find((u: any) => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), name, email, password: hashedPassword };
    db.users.push(newUser);
    await saveDb(db);
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET);
    res.json({ token, user: { id: newUser.id, name, email } });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const db = await getDb();
    const user = db.users.find((u: any) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });

  // Middleware to verify JWT
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      req.userId = decoded.userId;
      next();
    } catch (e) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

  // Books
  app.get("/api/books", async (req, res) => {
    const db = await getDb();
    const { search, genre } = req.query;
    let filtered = db.books;
    if (search) {
      const s = (search as string).toLowerCase();
      filtered = filtered.filter((b: any) => b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s));
    }
    if (genre) {
      filtered = filtered.filter((b: any) => b.genre === genre);
    }
    res.json(filtered);
  });

  app.post("/api/books", authenticate, upload.single("image"), async (req: any, res) => {
    const { title, author, genre, description, condition } = req.body;
    const db = await getDb();
    const newBook = {
      id: Date.now().toString(),
      userId: req.userId,
      title,
      author,
      genre,
      description,
      condition,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date().toISOString()
    };
    db.books.push(newBook);
    await saveDb(db);
    res.json(newBook);
  });

  app.delete("/api/books/:id", authenticate, async (req: any, res) => {
    const db = await getDb();
    const index = db.books.findIndex((b: any) => b.id === req.params.id && b.userId === req.userId);
    if (index === -1) return res.status(404).json({ message: "Book not found or unauthorized" });
    db.books.splice(index, 1);
    await saveDb(db);
    res.json({ message: "Deleted" });
  });

  // User Profile
  app.get("/api/profile", authenticate, async (req: any, res) => {
    const db = await getDb();
    const user = db.users.find((u: any) => u.id === req.userId);
    const userBooks = db.books.filter((b: any) => b.userId === req.userId);
    res.json({ user: { id: user.id, name: user.name, email: user.email }, books: userBooks });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
