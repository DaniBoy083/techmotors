# TechMotors - Oficina Especializada 🚗

Plataforma moderna para gerenciamento de serviços de oficina automotiva. Desenvolvida com Next.js 16 e Tailwind CSS, oferecendo uma experiência de usuário intuitiva e responsiva.

## Sobre o Projeto

TechMotors é uma aplicação web para gerenciamento de serviços automotivos, permitindo que clientes conheçam os serviços disponíveis, agendum consultas e acompanhem seus veículos.

### Tecnologias

- **Framework**: Next.js 16.2.3
- **React**: 19.2.4
- **CSS**: Tailwind CSS 4
- **Linguagem**: TypeScript
- **Linting**: ESLint 9

## Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/techmotors.git
cd techmotors
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

## Desenvolvimento

Para executar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói a aplicação para produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o ESLint para verificar o código

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx      # Layout root com metadata e header
│   ├── page.tsx        # Página inicial
│   ├── globals.css     # Estilos globais
│   └── icon.tsx        # Favicon dinâmico
├── components/
│   └── Header.tsx      # Componente header reutilizável
public/
└── assets/             # Logo e imagens estáticas
```

## Componentes

### Header
Componente reutilizável com:
- Logo TechMotors em preto
- Navegação responsiva
- Botão de chamada para ação (CTA)

## Deploy

### Vercel (Recomendado)

A forma mais fácil de fazer deploy é usar a [Plataforma Vercel](https://vercel.com):

1. Faça push do seu código para o GitHub
2. Conecte seu repositório ao Vercel
3. Vercel detectará automaticamente que é um projeto Next.js
4. Suas variáveis de ambiente serão configuradas automaticamente
5. Deploy realizado!

Consulte a [documentação de deploy Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database (quando implementado)
DATABASE_URL=

# API Keys (quando necessário)
# API_KEY=

# Vercel
VERCEL_URL=
```

## Roadmap

- [ ] Página de serviços
- [ ] Sistema de agendamento
- [ ] Dashboard administrativo
- [ ] Integração com banco de dados
- [ ] Sistema de autenticação
- [ ] Blog com dicas de manutenção

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato

**TechMotors** - Sua oficina de confiança para manutenção e reparo de veículos

- 📧 Email: contato@techmotors.com
- 📱 Telefone: (11) 98765-4321
- 📍 Localização: São Paulo, SP
