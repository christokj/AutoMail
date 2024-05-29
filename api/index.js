const express = require('express');
const cors = require('cors');
const mailRoutes = require('./routes/mailRoutes');

const app = express();

app.use(cors({
  origin: 'https://autoMail.vercel.app',
  credentials: true
}));

app.use(express.json());

app.use('/api/sendMail', mailRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});