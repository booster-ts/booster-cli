FROM node:latest

WORKDIR /app/node

COPY . .

RUN npm ci
RUN npm run build
RUN npm link

CMD ["npm run test-func"]