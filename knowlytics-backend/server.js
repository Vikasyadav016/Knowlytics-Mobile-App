const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const app = express();

const allowedOrigins = [
  'https://opulent-space-meme-x49xxxpjp9w2pp79-8081.app.github.dev',
  'https://opulent-space-meme-x49xxxpjp9w2pp79-5008.app.github.dev/',
  'https://opulent-space-meme-x49xxxpjp9w2pp79-8081.app.github.dev/',
  'https://opulent-space-meme-x49xxxpjp9w2pp79-8081.app.github.dev/',
//   'http://localhost:3000', // for local dev
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/auth/knowlytics", require("./routes/knowlyticsAuthRoutes"));

const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
