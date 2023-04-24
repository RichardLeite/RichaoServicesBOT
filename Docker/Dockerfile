FROM node:alpine

RUN apk add --no-cache git

RUN git clone https://github.com/RichardLeite/RichaoServicesBOT.git /usr/app/

WORKDIR /usr/app/

RUN git pull

RUN npm install

EXPOSE 3000

ENV TOKEN ""
ENV CLIENT_ID ""
ENV GUILD_ID ""

CMD ["npm", "start"]