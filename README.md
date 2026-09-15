# 🐳 Node.js 24 + TypeScript + Docker

Projeto de exemplo para execução de uma aplicação **Node.js 24 com TypeScript** utilizando Docker.

O objetivo é criar uma imagem Docker preparada para executar uma aplicação Node.js/TypeScript, permitindo que o código-fonte da aplicação seja alterado no computador e as alterações sejam refletidas dentro do container através de um **bind mount**.

## 🚀 Tecnologias

- Node.js 24
- TypeScript
- Docker
- npm

## 📋 Pré-requisitos

Para executar o projeto é necessário ter o Docker instalado.

Verifique a instalação:

```bash id="fjhnqk"
docker --version
```

## 📦 Criando a imagem

Na pasta onde está localizado o `Dockerfile`, execute:

```bash id="bzbxlw"
docker build -t minha-app .
```

Onde:

- `docker build` cria uma imagem Docker.
- `-t minha-app` define o nome da imagem.
- `.` define o diretório atual como contexto para o build.

Para verificar se a imagem foi criada:

```bash id="i3pcbw"
docker images
```

## 🐳 Executando o container

No **PowerShell**, acesse primeiro a pasta que contém a aplicação Node.js que será executada dentro do container.

Exemplo:

```powershell id="l1ofhl"
cd C:\meus-projetos\minha-app
```

Depois execute:

```powershell id="k5pg2q"
docker run --name minha-app --rm -p 3000:3000 -e USER_NAME="Ordilia Pereira Costa" -e PORT=3000 -v ${pwd}:/imagem minha-app
```

> **Importante:** `${pwd}` representa o diretório atual do PowerShell. Portanto, o comando deve ser executado dentro da pasta que contém a aplicação Node.js.

## 🔎 Entendendo o comando `docker run`

O comando completo:

```powershell id="1hbtr8"
docker run \
  --name minha-app \
  --rm \
  -p 3000:3000 \
  -e USER_NAME="Ordilia Pereira Costa" \
  -e PORT=3000 \
  -v ${pwd}:/imagem \
  minha-app
```

### `--name minha-app`

Define o nome do container:

```text id="flr59x"
minha-app
```

Isso facilita a utilização de outros comandos:

```bash id="d8owqh"
docker logs minha-app
docker stop minha-app
docker exec -it minha-app sh
```

### `--rm`

Remove automaticamente o container quando ele for encerrado:

```text id="xphm3d"
--rm
```

Dessa forma, ao finalizar a execução, não será necessário executar posteriormente:

```bash id="tj9zzt"
docker rm minha-app
```

A imagem `minha-app` **não é removida**. Apenas o container é excluído.

### `-p 3000:3000`

Mapeia a porta `3000` do computador para a porta `3000` do container:

```text id="8cq0bz"
-p 3000:3000

   computador
       3000
        │
        ▼
┌─────────────────┐
│    Container    │
│                 │
│      3000       │
└─────────────────┘
```

A aplicação poderá ser acessada através de:

```text id="b50zcn"
http://localhost:3000
```

## 🌎 Variáveis de ambiente

O comando também envia variáveis de ambiente para a aplicação:

```powershell id="vkwftw"
-e USER_NAME="Ordilia Pereira Costa"
-e PORT=3000
```

Neste projeto elas são utilizadas **apenas para testes**, portanto podem receber outros valores.

Por exemplo:

```powershell id="90jfev"
-e USER_NAME="Teste Docker"
-e PORT=3000
```

No Node.js elas podem ser acessadas através de:

```typescript id="xkqlv6"
const userName = process.env.USER_NAME;
const port = process.env.PORT;

console.log(userName);
console.log(port);
```

## 📂 Bind mount da aplicação

Uma das partes mais importantes do comando é:

```powershell id="ls9jd0"
-v ${pwd}:/imagem
```

`${pwd}` representa o diretório atual no **PowerShell**.

Por exemplo, estando em:

```text id="p8w28f"
C:\curso-node\minha-aplicacao
```

e executando:

```powershell id="bsjrt3"
-v ${pwd}:/imagem
```

o Docker monta aproximadamente:

```text id="25i89s"
Windows                         Container

C:\curso-node\minha-aplicacao  →  /imagem
```

Portanto, `/imagem` dentro do container passa a representar a pasta da aplicação existente no computador.

## 🔄 Atualização da aplicação

Como a pasta está montada através de um **bind mount**, alterações realizadas nos arquivos da aplicação no computador ficam disponíveis dentro do container.

Por exemplo:

```text id="gmq81j"
Computador
   │
   │ altera
   ▼
src/app.ts
   │
   │ bind mount
   ▼
Container
/imagem/src/app.ts
```

Isso permite desenvolver a aplicação sem precisar criar uma nova imagem Docker toda vez que um arquivo TypeScript for alterado.

> Para que a aplicação seja automaticamente reiniciada após uma alteração, ela também precisa utilizar uma ferramenta de monitoramento, como **nodemon**, configurada para observar os arquivos da aplicação.

## 📁 Exemplo

Suponha que a aplicação esteja em:

```text id="kg6v3f"
C:\curso-node\teste-node
```

Entre na pasta:

```powershell id="6idkxb"
cd C:\curso-node\teste-node
```

Execute:

```powershell id="71rs5i"
docker run --name minha-app --rm -p 3000:3000 -e USER_NAME="Teste Docker" -e PORT=3000 -v ${pwd}:/imagem minha-app
```

A pasta:

```text id="z7amri"
C:\curso-node\teste-node
```

será disponibilizada dentro do container como:

```text id="djwq60"
/imagem
```

## 🛠️ Desenvolvimento com Nodemon

Caso a imagem esteja configurada para utilizar o `nodemon`, alterações nos arquivos TypeScript podem provocar automaticamente a reinicialização da aplicação.

Por exemplo:

```text id="o30t65"
VS Code
   │
   │ salva app.ts
   ▼
Pasta no Windows
   │
   │ bind mount
   ▼
/imagem no container
   │
   │ nodemon detecta alteração
   ▼
Aplicação reiniciada
```

Assim o fluxo de desenvolvimento fica:

```text id="qsmqv7"
Alterar código → Salvar → Docker recebe alteração → Nodemon reinicia
```

sem precisar executar novamente:

```bash id="vm2al3"
docker build
```

a cada alteração.

## 🛑 Encerrando o container

Como o container está sendo executado no terminal, utilize:

```text id="5u0egk"
Ctrl + C
```

Como foi utilizado:

```text id="3w9s1g"
--rm
```

o container será automaticamente removido após ser encerrado.

Também é possível encerrá-lo utilizando outro terminal:

```bash id="jtr49x"
docker stop minha-app
```

## 🔍 Comandos úteis

Ver containers em execução:

```bash id="r0w8co"
docker ps
```

Ver todos os containers:

```bash id="78nbhh"
docker ps -a
```

Ver imagens:

```bash id="m98p0s"
docker images
```

Entrar no container:

```bash id="kszphb"
docker exec -it minha-app sh
```

Dentro do container, verificar a aplicação montada:

```bash id="ypcclo"
cd /imagem
ls
```

Para sair:

```bash id="4ctcxh"
exit
```

## ⚡ Resumo rápido

### 1. Criar a imagem

```bash id="2ax7de"
docker build -t minha-app .
```

### 2. Entrar na pasta da aplicação

```powershell id="z1oyl3"
cd C:\caminho\da\aplicacao
```

### 3. Executar o container

```powershell id="8a6xf6"
docker run --name minha-app --rm -p 3000:3000 -e USER_NAME="Teste Docker" -e PORT=3000 -v ${pwd}:/imagem minha-app
```

### 4. Alterar o código

Edite normalmente os arquivos da aplicação no VS Code.

O bind mount:

```powershell id="wh17fb"
-v ${pwd}:/imagem
```

mantém a pasta local e `/imagem` do container sincronizadas.

## 👨‍💻 Autor

**Euripides Costa**

GitHub: `epcosta`

## 📄 Objetivo

Projeto criado para fins de estudo e aprendizado de:

- Docker
- Node.js 24
- TypeScript
- Variáveis de ambiente
- Mapeamento de portas
- Bind mounts
- Desenvolvimento com atualização automática
