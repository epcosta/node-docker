# 🐳 Node.js 24 + TypeScript + Docker

Projeto de exemplo para execução de uma aplicação **Node.js 24 com TypeScript** utilizando Docker.

O objetivo deste projeto é demonstrar como criar uma imagem Docker contendo Node.js e TypeScript e executar a aplicação dentro de um container.

## 🚀 Tecnologias utilizadas

- Node.js 24
- TypeScript
- Docker
- npm

## 📋 Pré-requisitos

Para executar o projeto utilizando Docker, é necessário ter o **Docker** instalado.

Verifique a instalação executando:

```bash
docker --version
```

## 📦 Criando a imagem Docker

Na pasta onde está localizado o `Dockerfile`, execute:

```bash
docker build -t node24-typescript .
```

Onde:

- `docker build` cria uma nova imagem Docker.
- `-t node24-typescript` define o nome da imagem.
- `.` indica que o Docker deve utilizar o diretório atual como contexto para o build.

Após a criação, você pode verificar a imagem com:

```bash
docker images
```

## 🐳 Criando e executando o container

Para criar e executar um container utilizando a imagem:

```bash
docker run --name node24-ts node24-typescript
```

Onde:

- `docker run` cria e executa o container.
- `--name node24-ts` define o nome do container.
- `node24-typescript` é o nome da imagem utilizada.

## 🔄 Executando em segundo plano

Para executar o container em segundo plano, utilize a opção `-d`:

```bash
docker run -d --name node24-ts node24-typescript
```

## 🌐 Aplicação utilizando porta

Caso a aplicação Node.js utilize, por exemplo, a porta `3000`, execute:

```bash
docker run -d --name node24-ts -p 3000:3000 node24-typescript
```

O parâmetro:

```text
-p 3000:3000
```

representa:

```text
porta do computador : porta do container
       3000         :       3000
```

A aplicação poderá então ser acessada em:

```text
http://localhost:3000
```

## 📜 Visualizando os logs

Para visualizar os logs do container:

```bash
docker logs node24-ts
```

Para acompanhar os logs em tempo real:

```bash
docker logs -f node24-ts
```

Para sair da visualização dos logs pressione:

```text
Ctrl + C
```

Isso não encerra o container.

## ⏹️ Parando o container

```bash
docker stop node24-ts
```

## ▶️ Iniciando novamente

```bash
docker start node24-ts
```

Para iniciar e acompanhar a saída do container:

```bash
docker start -a node24-ts
```

## 🗑️ Removendo o container

Primeiro pare o container:

```bash
docker stop node24-ts
```

Depois remova:

```bash
docker rm node24-ts
```

Também é possível forçar a remoção:

```bash
docker rm -f node24-ts
```

## 🗑️ Removendo a imagem

Após remover o container, a imagem pode ser removida com:

```bash
docker rmi node24-typescript
```

## 📁 Estrutura básica do projeto

```text
node24-typescript/
│
├── src/
│   └── app.ts
│
├── Dockerfile
├── package.json
├── package-lock.json
├── tsconfig.json
├── .dockerignore
├── .gitignore
└── README.md
```

## 🧪 Exemplo de aplicação

Um exemplo simples para `src/app.ts`:

```typescript
console.log("Node.js 24 + TypeScript executando dentro do Docker!");
```

## 🐳 Exemplo de Dockerfile

```dockerfile
FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
```

> O `Dockerfile` deve ser ajustado de acordo com os scripts existentes no `package.json` do projeto.

## 🔍 Comandos Docker úteis

Ver containers em execução:

```bash
docker ps
```

Ver todos os containers:

```bash
docker ps -a
```

Ver imagens:

```bash
docker images
```

Entrar no terminal de um container em execução:

```bash
docker exec -it node24-ts sh
```

Para sair:

```bash
exit
```

## 👨‍💻 Autor

**Euripides Costa**

GitHub: `epcosta`

## 📄 Licença

Este projeto foi criado para fins de estudo e aprendizado de **Docker, Node.js e TypeScript**.
