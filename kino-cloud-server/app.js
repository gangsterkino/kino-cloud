const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fileRoutes = require('./routes/files'); // 引入文件上传路由



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 提供静态文件服务
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/models/User', require('./routes/users'));
app.use('/uploads', fileRoutes); // 将文件上传路由添加到 /uploads 路径

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.log(err);
    });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




