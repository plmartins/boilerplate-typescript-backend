import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/database';
import { errorHandlerMiddleware } from './middlewares/error-handler';
import authRoutes from './routes/auth';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

//Rotas
app.use('/api/auth', authRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: 'Projeto',
}));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Tratamento de erro centralizado
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "Projeto",
    documentation: "/api-docs",
    documentationJson: "/api-docs.json",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🟢`);
});