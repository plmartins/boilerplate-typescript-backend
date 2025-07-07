# TypeScript Backend Boilerplate

Boilerplate para desenvolvimento de APIs RESTful em TypeScript com foco em type safety, validação de dados e documentação automática.

## Tecnologias

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- Arquitetura Funcional
- Autenticação JWT
- Validação de dados com Zod
- Documentação automática com Swagger
- Middleware de autenticação
- Tratamento de erros global

## Estrutura do Projeto

```
src/
├── controllers/     # Controladores das rotas
├── models/         # Modelos do MongoDB
├── routes/         # Definição das rotas
├── middlewares/    # Middlewares personalizados
├── utils/         # Utilitários e funções auxiliares
├── config/        # Configurações do projeto
└── index.ts       # Ponto de entrada da aplicação
```

## 🛡️ Validação de Dados com Zod

O projeto utiliza Zod para validação de dados, garantindo que os dados recebidos sejam consistentes e seguros. Exemplo de uso:

```typescript
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});
```

## 📝 Documentação com Swagger

A documentação da API é gerada automaticamente usando Swagger. Para documentar suas rotas, use os decorators fornecidos pelo Swagger.

## 🚀 Começando

1. Clone o repositório
2. Configure as variáveis de ambiente
3. Execute `npm run dev` para iniciar o servidor em modo de desenvolvimento
4. Acesse a documentação em `http://localhost:8080/api-docs`

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
