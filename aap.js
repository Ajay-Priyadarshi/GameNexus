import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import { dirname } from 'path';  
import { fileURLToPath } from 'url';  
import authRoutes from './src/routes/authRoutes.js';
import profileRoutes from './src/routes/profileRoutes.js';
import searchRoutes from './src/routes/searchRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://127.0.0.1:27017/GameNexus").then(() => {
  console.log("mongodb connected");
});

app.use(session({
  secret: 'i-m-a-n-o-o-b-i-e',
  resave: false,
  saveUninitialized: true,
}));

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'static')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/profile', express.static(path.join(__dirname, 'static')));
app.use('/auth', express.static(path.join(__dirname, 'static')));
app.use('/about', express.static(path.join(__dirname, 'static')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, 'uploads', filename));
});

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes); 
app.use('/search', searchRoutes);

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'home.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});