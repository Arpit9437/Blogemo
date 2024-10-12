import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'
import { connectDb } from './db/connectDb.js';
import blogRoutes from './routes/blog.routes.js'
import cors from 'cors'

const __dirname = path.resolve();
const app = express();
dotenv.config();
const port = process.env.PORT || 5000
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'http://localhost:5173', credentials: true}))
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.use('/blog/api', blogRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(port, () => {
    connectDb();
})