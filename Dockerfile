FROM node:13

WORKDIR /app/node

COPY . .

RUN npm ci
RUN npm run build
RUN npm link

RUN mkdir -p testing

CMD ["npm run test-func"]