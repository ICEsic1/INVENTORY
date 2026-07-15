import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import storageRoutes from './routes/storageRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/storage', storageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});