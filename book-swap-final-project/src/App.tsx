import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { 
  Book, 
  Search, 
  Plus, 
  User, 
  LogOut, 
  Heart, 
  MessageSquare, 
  ArrowRight, 
  BookOpen, 
  Library, 
  Filter,
  Menu,
  X,
  Trash2,
  Edit
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface BookData {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  condition: string;
  imageUrl: string | null;
  userId: string;
  createdAt: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

// --- Components ---

const Navbar = ({ user, onLogout }: { user: UserData | null; onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#5C4033] rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
              <BookOpen size={24} />
            </div>
            <span className="text-2xl font-serif italic font-bold text-[#2D1B14]">Book Swap</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="text-[#5C4033] hover:text-[#8B5E3C] font-medium">Explore</Link>
            {user ? (
              <>
                <Link to="/add-book" className="flex items-center gap-2 bg-[#5C4033] text-white px-5 py-2.5 rounded-full hover:bg-[#4A3329] transition-colors shadow-md">
                  <Plus size={18} />
                  <span>Swap Now</span>
                </Link>
                <div className="flex items-center gap-4 border-l border-[#E8E2D9] pl-8">
                  <Link to="/profile" className="flex items-center gap-2 text-[#5C4033] hover:text-[#8B5E3C]">
                    <User size={20} />
                    <span className="font-medium">{user.name}</span>
                  </Link>
                  <button onClick={onLogout} className="text-[#A08C7D] hover:text-[#2D1B14]">
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-[#5C4033] font-medium hover:text-[#8B5E3C]">Login</Link>
                <Link to="/register" className="bg-[#5C4033] text-white px-6 py-2.5 rounded-full hover:bg-[#4A3329] transition-colors shadow-md">Join Community</Link>
              </div>
            )}
          </div>

          <button className="md:hidden text-[#5C4033]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FDFBF7] border-t border-[#E8E2D9] overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <Link to="/explore" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#5C4033]">Explore</Link>
              {user ? (
                <>
                  <Link to="/add-book" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#5C4033]">Swap a Book</Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#5C4033]">Profile</Link>
                  <button onClick={() => { onLogout(); setIsOpen(false); }} className="text-left text-lg font-medium text-red-600">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#5C4033]">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#5C4033]">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#2D1B14] text-[#E8E2D9] py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#2D1B14]">
              <BookOpen size={20} />
            </div>
            <span className="text-2xl font-serif italic font-bold text-white">Book Swap</span>
          </div>
          <p className="text-[#A08C7D] max-w-sm mb-8">
            Building a sustainable community of readers where every book finds a new home and every story continues to inspire.
          </p>
          <div className="flex gap-4">
            {/* Social icons placeholder */}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-[#A08C7D]">
            <li><Link to="/explore" className="hover:text-white transition-colors">Explore Books</Link></li>
            <li><Link to="/add-book" className="hover:text-white transition-colors">Swap a Book</Link></li>
            <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="flex flex-col gap-4 text-[#A08C7D]">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/10 text-center text-[#A08C7D] text-sm">
        &copy; 2026 Book Swap. All rights reserved.
      </div>
    </div>
  </footer>
);

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState<BookData[]>([]);

  useEffect(() => {
    fetch("/api/books?limit=4")
      .then(res => res.json())
      .then(data => setFeaturedBooks(data.slice(0, 4)));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-[#E8E2D9] text-[#5C4033] rounded-full text-sm font-bold tracking-wider uppercase mb-6">
                Community Driven
              </span>
              <h1 className="text-6xl md:text-7xl font-serif italic font-bold text-[#2D1B14] leading-tight mb-8">
                Share Stories, <br />
                <span className="text-[#8B5E3C]">Swap Knowledge</span>
              </h1>
              <p className="text-xl text-[#5C4033] mb-10 max-w-lg leading-relaxed">
                Join a premium platform where books find new life. Exchange your favorites, donate to those in need, and discover your next great read.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/explore" className="bg-[#5C4033] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#4A3329] transition-all shadow-xl hover:scale-105">
                  Swap Now
                </Link>
                <Link to="/explore" className="bg-white text-[#5C4033] border-2 border-[#E8E2D9] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#FDFBF7] transition-all">
                  Explore Books
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80" 
                  alt="Cozy Bookstore" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#E8E2D9] rounded-full -z-10 blur-3xl opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#8B5E3C] rounded-full -z-10 blur-3xl opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif italic font-bold text-[#2D1B14] mb-4">Browse by Genre</h2>
            <div className="w-24 h-1 bg-[#8B5E3C] mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Biography", "History", "Poetry", "Self-Help"].map((genre) => (
              <Link 
                key={genre}
                to={`/explore?genre=${genre}`}
                className="group p-8 bg-[#FDFBF7] rounded-2xl border border-[#E8E2D9] text-center hover:bg-[#5C4033] transition-all hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-[#E8E2D9] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20">
                  <Library className="text-[#5C4033] group-hover:text-white" size={24} />
                </div>
                <span className="text-lg font-bold text-[#2D1B14] group-hover:text-white">{genre}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-serif italic font-bold text-[#2D1B14] mb-4">Recently Added</h2>
              <p className="text-[#5C4033]">Discover the latest treasures from our community.</p>
            </div>
            <Link to="/explore" className="text-[#8B5E3C] font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
            {featuredBooks.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-[#E8E2D9]">
                <p className="text-[#A08C7D] italic">No books listed yet. Be the first to swap!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#5C4033] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif italic font-bold mb-4">How It Works</h2>
            <p className="text-[#E8E2D9]">Simple steps to start your swapping journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: "List Your Book", desc: "Upload a photo and details of the book you want to swap or donate.", icon: <Plus size={32} /> },
              { title: "Find a Match", desc: "Browse our collection and connect with other readers in your area.", icon: <Search size={32} /> },
              { title: "Swap & Enjoy", desc: "Meet up or ship your books and dive into your new story.", icon: <MessageSquare size={32} /> }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-[#E8E2D9] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#E8E2D9] rounded-[3rem] p-12 md:p-20 text-center">
            <h2 className="text-4xl font-serif italic font-bold text-[#2D1B14] mb-6">Join the Book Club</h2>
            <p className="text-[#5C4033] mb-10 max-w-md mx-auto">Get weekly updates on new arrivals, community events, and reading tips.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-6 py-4 rounded-full bg-white border-none focus:ring-2 focus:ring-[#5C4033] outline-none"
              />
              <button className="bg-[#5C4033] text-white px-8 py-4 rounded-full font-bold hover:bg-[#4A3329] transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const BookCard = ({ book, key }: { book: BookData; key?: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#E8E2D9]"
    >
      <div className="h-64 overflow-hidden relative group">
        <img 
          src={book.imageUrl || "https://images.unsplash.com/photo-1543004218-ee141104623a?auto=format&fit=crop&w=400&q=80"} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#5C4033] hover:text-red-500 transition-colors shadow-md">
            <Heart size={20} />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-[#5C4033]/90 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider">
            {book.genre}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#2D1B14] mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-[#8B5E3C] text-sm font-medium mb-4">{book.author}</p>
        <div className="flex justify-between items-center pt-4 border-t border-[#E8E2D9]">
          <span className="text-xs font-bold text-[#A08C7D] uppercase tracking-widest">{book.condition}</span>
          <Link to={`/book/${book.id}`} className="text-[#5C4033] font-bold text-sm hover:underline">Details</Link>
        </div>
      </div>
    </motion.div>
  );
};

const Explore = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const g = params.get("genre");
    if (g) setGenre(g);
    fetchBooks(search, g || "");
  }, [location.search]);

  const fetchBooks = (s: string, g: string) => {
    fetch(`/api/books?search=${s}&genre=${g}`)
      .then(res => res.json())
      .then(data => setBooks(data));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(search, genre);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-serif italic font-bold text-[#2D1B14] mb-2">Explore Library</h1>
            <p className="text-[#5C4033]">Find your next adventure from our community collection.</p>
          </div>
          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A08C7D]" size={20} />
              <input 
                type="text" 
                placeholder="Search title, author..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-[#E8E2D9] focus:ring-2 focus:ring-[#5C4033] outline-none"
              />
            </div>
            <button type="submit" className="bg-[#5C4033] text-white px-6 py-3 rounded-full font-bold hover:bg-[#4A3329] transition-all">
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E2D9] sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-[#5C4033]" />
                <h3 className="font-bold text-[#2D1B14]">Filters</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#A08C7D] uppercase tracking-wider mb-3">Genre</label>
                  <select 
                    value={genre}
                    onChange={(e) => { setGenre(e.target.value); fetchBooks(search, e.target.value); }}
                    className="w-full p-3 rounded-xl bg-[#FDFBF7] border border-[#E8E2D9] outline-none"
                  >
                    <option value="">All Genres</option>
                    {["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Biography", "History", "Poetry", "Self-Help"].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Books Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
              {books.length === 0 && (
                <div className="col-span-full py-32 text-center bg-white rounded-3xl border border-dashed border-[#E8E2D9]">
                  <Library size={48} className="mx-auto text-[#E8E2D9] mb-4" />
                  <p className="text-[#A08C7D] italic">No books found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddBook = ({ token }: { token: string | null }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "Fiction",
    description: "",
    condition: "Good"
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!token) {
    useEffect(() => navigate("/login"), []);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value as string));
    if (image) data.append("image", image);

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data
      });
      if (res.ok) navigate("/profile");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-[#E8E2D9]">
          <h1 className="text-4xl font-serif italic font-bold text-[#2D1B14] mb-8 text-center">List a Book</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#5C4033] mb-2">Book Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D9] focus:ring-2 focus:ring-[#5C4033] outline-none"
                  placeholder="e.g. The Great Gatsby"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#5C4033] mb-2">Author</label>
                <input 
                  required
                  type="text" 
                  value={formData.author}
                  onChange={e => setFormData({...formData, author: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D9] focus:ring-2 focus:ring-[#5C4033] outline-none"
                  placeholder="e.g. F. Scott Fitzgerald"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#5C4033] mb-2">Genre</label>
                <select 
                  value={formData.genre}
                  onChange={e => setFormData({...formData, genre: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D9] outline-none"
                >
                  {["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Biography", "History", "Poetry", "Self-Help"].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#5C4033] mb-2">Condition</label>
                <select 
                  value={formData.condition}
                  onChange={e => setFormData({...formData, condition: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D9] outline-none"
                >
                  {["New", "Like New", "Good", "Fair", "Poor"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#5C4033] mb-2">Description</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D9] focus:ring-2 focus:ring-[#5C4033] outline-none resize-none"
                placeholder="Tell us about the book..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#5C4033] mb-2">Book Cover Image</label>
              <div className="relative border-2 border-dashed border-[#E8E2D9] rounded-2xl p-8 text-center hover:border-[#5C4033] transition-colors cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setImage(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2">
                  <Plus className="text-[#A08C7D]" size={32} />
                  <span className="text-[#A08C7D] font-medium">{image ? image.name : "Click to upload image"}</span>
                </div>
              </div>
            </div>
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-[#5C4033] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#4A3329] transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? "Listing Book..." : "List Book for Swap"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ token, onLogout }: { token: string | null; onLogout: () => void }) => {
  const [data, setData] = useState<{ user: UserData; books: BookData[] } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("/api/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setData(data));
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this book?")) return;
    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setData(prev => prev ? { ...prev, books: prev.books.filter(b => b.id !== id) } : null);
    }
  };

  if (!data) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* User Info */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[3rem] border border-[#E8E2D9] text-center shadow-sm">
              <div className="w-24 h-24 bg-[#E8E2D9] rounded-full flex items-center justify-center mx-auto mb-6 text-[#5C4033]">
                <User size={48} />
              </div>
              <h2 className="text-2xl font-bold text-[#2D1B14] mb-1">{data.user.name}</h2>
              <p className="text-[#A08C7D] mb-8">{data.user.email}</p>
              <div className="flex flex-col gap-3">
                <Link to="/add-book" className="bg-[#5C4033] text-white py-3 rounded-2xl font-bold hover:bg-[#4A3329] transition-all">
                  Add New Book
                </Link>
                <button onClick={onLogout} className="text-red-600 font-bold py-3 hover:bg-red-50 rounded-2xl transition-all">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* User Books */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif italic font-bold text-[#2D1B14] mb-8">My Listed Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data.books.map((book) => (
                <div key={book.id} className="bg-white rounded-3xl overflow-hidden border border-[#E8E2D9] group">
                  <div className="h-48 relative">
                    <img 
                      src={book.imageUrl || "https://images.unsplash.com/photo-1543004218-ee141104623a?auto=format&fit=crop&w=400&q=80"} 
                      alt={book.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={() => handleDelete(book.id)}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2D1B14] mb-1">{book.title}</h3>
                    <p className="text-[#8B5E3C] text-sm font-medium mb-4">{book.author}</p>
                    <div className="flex justify-between items-center text-xs font-bold text-[#A08C7D] uppercase tracking-widest">
                      <span>{book.condition}</span>
                      <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
              {data.books.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-[#E8E2D9]">
                  <p className="text-[#A08C7D] italic">You haven't listed any books yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthPage = ({ type, onAuth }: { type: "login" | "register"; onAuth: (token: string, user: UserData) => void }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const endpoint = type === "login" ? "/api/auth/login" : "/api/auth/register";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        onAuth(data.token, data.user);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-xl border border-[#E8E2D9]"
      >
        <h1 className="text-4xl font-serif italic font-bold text-[#2D1B14] mb-8 text-center">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        {error && <p className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm mb-6 text-center font-medium">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {type === "register" && (
            <div>
              <label className="block text-sm font-bold text-[#5C4033] mb-2">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D9] focus:ring-2 focus:ring-[#5C4033] outline-none"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-[#5C4033] mb-2">Email Address</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D9] focus:ring-2 focus:ring-[#5C4033] outline-none"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#5C4033] mb-2">Password</label>
            <input 
              required
              type="password" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D9] focus:ring-2 focus:ring-[#5C4033] outline-none"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-[#5C4033] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#4A3329] transition-all shadow-xl">
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-8 text-center text-[#A08C7D]">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}
          <Link to={type === "login" ? "/register" : "/login"} className="text-[#5C4033] font-bold ml-2 hover:underline">
            {type === "login" ? "Register" : "Login"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch("/api/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) setUser(data.user);
          else handleLogout();
        })
        .catch(() => handleLogout());
    }
  }, [token]);

  const handleAuth = (newToken: string, newUser: UserData) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-[#2D1B14]">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<AuthPage type="login" onAuth={handleAuth} />} />
            <Route path="/register" element={<AuthPage type="register" onAuth={handleAuth} />} />
            <Route path="/add-book" element={<AddBook token={token} />} />
            <Route path="/profile" element={<Profile token={token} onLogout={handleLogout} />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const BookDetails = () => {
  const [book, setBook] = useState<BookData | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/books")
      .then(res => res.json())
      .then(data => {
        const found = data.find((b: any) => b.id === id);
        setBook(found);
      });
  }, [id]);

  if (!book) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#5C4033] font-bold mb-12 hover:gap-3 transition-all">
          <ArrowRight size={20} className="rotate-180" /> Back to Library
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border border-[#E8E2D9] bg-white p-4"
          >
            <img 
              src={book.imageUrl || "https://images.unsplash.com/photo-1543004218-ee141104623a?auto=format&fit=crop&w=800&q=80"} 
              alt={book.title} 
              className="w-full h-[600px] object-cover rounded-[2.5rem]"
            />
          </motion.div>
          
          <div className="flex flex-col justify-center">
            <span className="inline-block px-4 py-1.5 bg-[#E8E2D9] text-[#5C4033] rounded-full text-sm font-bold tracking-wider uppercase mb-6 w-fit">
              {book.genre}
            </span>
            <h1 className="text-5xl font-serif italic font-bold text-[#2D1B14] mb-4">{book.title}</h1>
            <p className="text-2xl text-[#8B5E3C] font-medium mb-8">by {book.author}</p>
            
            <div className="flex gap-8 mb-10 pb-10 border-b border-[#E8E2D9]">
              <div>
                <span className="block text-xs font-bold text-[#A08C7D] uppercase tracking-widest mb-1">Condition</span>
                <span className="text-lg font-bold text-[#2D1B14]">{book.condition}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-[#A08C7D] uppercase tracking-widest mb-1">Listed On</span>
                <span className="text-lg font-bold text-[#2D1B14]">{new Date(book.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-lg font-bold text-[#2D1B14] mb-4">Description</h3>
              <p className="text-[#5C4033] leading-relaxed text-lg">{book.description}</p>
            </div>
            
            <div className="flex gap-4">
              <button className="flex-1 bg-[#5C4033] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#4A3329] transition-all shadow-xl flex items-center justify-center gap-2">
                <MessageSquare size={20} />
                Contact Owner
              </button>
              <button className="w-16 h-16 border-2 border-[#E8E2D9] rounded-2xl flex items-center justify-center text-[#5C4033] hover:bg-white transition-all">
                <Heart size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
