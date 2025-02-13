const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');
const router = require('./routes/uploadRoutes');

const app = express();
const port = 5000;

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use('/upload', router);
app.use('/output', express.static('output'));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});