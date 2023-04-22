FROM node:alpine

RUN apk add --no-cache git

RUN git clone https://github.com/RichardLeite/RichaoServicesBOT.git /usr/app/

WORKDIR /usr/app/RichaoServicesBOT

RUN npm install

COPY ./.env /usr/app/RichaoServicesBOT

EXPOSE 3000

CMD ["npm", "start"]