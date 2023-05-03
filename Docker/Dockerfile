FROM node:alpine

RUN apk add --no-cache git

RUN git clone https://github.com/RichardLeite/RichaoServicesBOT.git /usr/app/

WORKDIR /usr/app/

COPY start.sh /usr/app/start.sh

RUN chmod +x /usr/app/start.sh

EXPOSE 3000

ENV TOKEN ""
ENV CLIENT_ID ""
ENV GUILD_ID ""

CMD ["sh", "/usr/app/start.sh"]
