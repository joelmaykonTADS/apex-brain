FROM node:14

RUN npm i -g @nestjs/cli

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["nest", "start"]