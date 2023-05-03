#!/bin/sh

cd /usr/app

if [ ! -f .lastupdate ]; then
  touch .lastupdate
fi

while true; do
  # Obtenha a data de modificação do arquivo .lastupdate
  LAST_UPDATE=$(stat -c %Y .lastupdate)

  # Atualize o repositório git somente se houver alterações
  git remote update
  if [ $(git status --porcelain | wc -l) -gt 0 ]; then
    git merge
    LAST_UPDATE=$(stat -c %Y .lastupdate)
    echo "Repository updated, restarting service..."
    npm install
    npm start
  fi

  # Atualize o arquivo .lastupdate
  touch .lastupdate

  # Aguarde 5 minutos
  sleep 300
done
