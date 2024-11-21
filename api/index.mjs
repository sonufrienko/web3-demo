import express from 'express';
import { connectDB } from './config/database.mjs';
import nftsRouter from './routes/nfts.mjs';
import transactionsRouter from './routes/transactions.mjs';

const app = express();
connectDB();

app.use(express.json());
app.use('/api', nftsRouter);
app.use('/api', transactionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
