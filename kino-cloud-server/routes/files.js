const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

// 设置文件存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 文件上传路由
router.post('/', upload.single('file'), (req, res) => {
    try {
        res.send({ message: 'File uploaded successfully', file: req.file });
    } catch (error) {
        res.status(400).send({ message: 'File upload failed', error });
    }
});

// 获取文件列表路由
router.get('/', (req, res) => {
    // 这里可以从数据库获取文件列表
    res.send([{ name: 'file1.txt' }, { name: 'file2.txt' }]);
});



// 获取最近文件路由
router.get('/recent-files', (req, res) => {
    // 这里可以从数据库获取最近文件
    res.send([{ name: 'recent-file1.txt' }, { name: 'recent-file2.txt' }]);
});

module.exports = router;

