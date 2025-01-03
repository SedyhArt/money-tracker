import mongoose from 'mongoose';
import 'dotenv/config';
import "./bot";

const mongoUri = process.env.MONGODB_URI || '';

if (!mongoUri) {
    console.error('Ошибка: MONGODB_URI не задан в .env');
    process.exit(1);
}

// Подключение к MongoDB
mongoose.connect(mongoUri, )
    .then(() => {
        console.log('✅ Успешное подключение к MongoDB');
        console.log('🚀 Бэкенд и бот успешно запущены!');
    })
    .catch((err) => {
        console.error('❌ Ошибка подключения к MongoDB:', err);
        process.exit(1);
    });
