FROM node:alpine

RUN apk add --no-cache git

RUN git clone https://github.com/RichardLeite/RichaoServicesBOT.git /usr/app/

WORKDIR /usr/app/

COPY start.sh /usr/app/start.sh

RUN touch /usr/app/.lastupdate
RUN chmod +x /usr/app/start.sh

EXPOSE 3000

ENV TOKEN ""
ENV CLIENT_ID ""
ENV GUILD_ID ""
ENV MESSAGE_CREATE_CHANNEL_ID ""
ENV WELCOME_CHANNEL_ID ""
ENV WELCOME_CHANNEL_NAME ""
ENV MEMBERS_ROLE_ID ""
ENV MEMBERS_ROLE_NAME ""
ENV EXTERNAL_HOSTNAME ""
ENV INVITE_CODE ""

CMD ["sh", "/usr/app/start.sh"]
