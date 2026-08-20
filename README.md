# backend-arnaldoliro

API do site pessoal (portfólio). Hoje sua única responsabilidade é receber o formulário de contato do frontend e enviar os e-mails correspondentes via Gmail SMTP (nodemailer): uma notificação para o dono do site e um auto-reply automático para quem enviou a mensagem.

## Stack

- [NestJS](https://nestjs.com/) 11
- `class-validator` / `class-transformer` — validação de entrada
- `@nestjs/throttler` — rate limiting
- `nodemailer` — envio de e-mail via SMTP

## Configuração

Copie `.env.example` para `.env` e preencha:

| Variável       | Descrição                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| `MAIL_USER`    | E-mail Gmail usado para autenticar no SMTP e como remetente                |
| `MAIL_PASS`    | Senha de app do Gmail (não a senha normal da conta — requer 2FA ativado)   |
| `MAIL_RECEIVER`| E-mail que recebe a notificação de nova mensagem do formulário             |
| `PORT`         | Porta em que a API sobe (padrão `3000`)                                    |

## Rodando o projeto

```bash
npm install
npm run start:dev   # modo watch
```

## Testes

```bash
npm test          # unitários
npm run test:cov  # cobertura
```

## API

`POST /contact` — recebe `{ name, email, message }` (validado via DTO), envia os e-mails e retorna `{ success, message }`. Limitada a 5 requisições por minuto por IP.
