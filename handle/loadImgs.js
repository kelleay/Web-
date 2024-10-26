const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require("./connection");
const connection = db.connection;

// 确保 uploads 目录存在
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// 设置 multer 存储配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // 文件保存的目录
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // 初始文件名（后续会重命名）
    }
});
const upload = multer({ storage });

// 上传处理函数
const handleUpload = (req, res) => {
    const location = req.body.location;
    const time = req.body.time;

    // 查询当前照片数量
    const countQuery = 'SELECT COUNT(*) AS count FROM image';
    connection.query(countQuery, (err, results) => {
        if (err) {
            console.error('查询数据库失败:', err);
            return res.status(500).send({ error: '查询失败' });
        }

        const num = results[0].count + 1; // 获取当前照片数量并加 1
        const newFileName = `img_${num}.png`; // 生成新的文件名
        const oldPath = req.file.path; // 上传时的临时文件路径
        const newPath = path.join(uploadsDir, newFileName); // 新的文件路径

        // 将文件重命名并移动到指定路径
        fs.rename(oldPath, newPath, (renameErr) => {
            if (renameErr) {
                console.error('重命名文件失败:', renameErr);
                return res.status(500).send({ error: '重命名失败' });
            }

            // 插入数据到数据库
            const insertQuery = 'INSERT INTO image (img_path, location, time) VALUES (?, ?, ?)';
            connection.query(insertQuery, [newFileName, location, time], (insertErr, insertResults) => {
                if (insertErr) {
                    console.error('插入数据库失败:', insertErr);
                    return res.status(500).send({ error: '插入数据库失败' });
                }
                res.send({ message: '上传成功', id: insertResults.insertId });
            });
        });
    });
};

// 导出 multer 中间件和处理函数
module.exports = {
    upload: upload.single('photo'), // 中间件
    handleUpload,
};
