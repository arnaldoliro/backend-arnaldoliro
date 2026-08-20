# backend-arnaldoliro

API do site pessoal (portfólio). Hoje sua única responsabilidade é receber o formulário de contato do frontend e enviar os e-mails correspondentes via [Resend](https://resend.com) (API HTTP de e-mail transacional): uma notificação para o dono do site e um auto-reply automático para quem enviou a mensagem.

## Stack

- [NestJS](https://nestjs.com/) 11
- `class-validator` / `class-transformer` — validação de entrada
- `@nestjs/throttler` — rate limiting
- `resend` — envio de e-mail via API HTTP

## Configuração

Copie `.env.example` para `.env` e preencha:

| Variável         | Descrição                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| `RESEND_API_KEY` | API key gerada no painel do Resend (escopo de envio apenas)                |
| `MAIL_FROM`      | Remetente verificado, ex: `"Nome <contato@seudominio.dev>"`                |
| `MAIL_RECEIVER`  | E-mail que recebe a notificação de nova mensagem do formulário             |
| `CORS_ORIGIN`    | URL do frontend liberada pelo CORS                                        |
| `PORT`           | Porta em que a API sobe (padrão `3000`)                                    |

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
