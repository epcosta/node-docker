

FROM node:24

WORKDIR /imagem

COPY . .

RUN npm install

VOLUME /imagem/node_modules

EXPOSE 3000

CMD [ "npm", "run","dev" ]

