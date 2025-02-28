import express from 'express';
import userRoute from './routes/user.route';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoute);

app.listen(port, () => {
  console.log(`[x] - server is running on port ${port}`);
});
