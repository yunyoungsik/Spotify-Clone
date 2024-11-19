import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from 'path';

import { connectDB } from './lib/db.js';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/admin.route.js';
import statRoutes from './routes/admin.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json()); // req.body를 파싱하기 위해 사용
app.use(clerkMiddleware()); // 인증 정보를 req 객체에 추가
app.use(
  fileUpload({
    useTempFiles: true, // 업로드된 파일을 임시 파일로 저장하도록 설정
    tempFileDir: path.join(__dirname, 'temp'), // 임시 파일이 저장될 디렉토리 경로를 설정
    createParentPath: true, // 필요한 경우, 지정된 디렉토리 경로가 없으면 자동으로 생성
    limits: {
      fileSize: 10 * 1024 * 1024, // 업로드 파일 크기 제한: 최대 10MB
    },
  })
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statRoutes);

// error handler
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    });
});

app.listen(PORT, () => {
  console.log('Server is running on ' + PORT);
  connectDB();
});

// todo: socket.io