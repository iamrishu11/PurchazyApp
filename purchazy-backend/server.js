const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Register both route files
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

const PORT = 5050;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log('✅ Routes loaded');
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
});
