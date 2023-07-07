import dotenv from 'dotenv';
import './src/db/db';
import app from './src/app';

dotenv.config();

const PORT = process.env.PORT || 3000;

const handleListening = () => console.log(`Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
