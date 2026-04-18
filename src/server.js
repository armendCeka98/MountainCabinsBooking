require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Cabin Booking API running 🚀' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});