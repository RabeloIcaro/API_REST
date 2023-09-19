# 20 é a versão e buster coloca sempre que for node
FROM node:20-buster 

# copy para copiar e o "." é para selecionar os arquivos da raiz do projeto e o "/tmp" é para informar para onde os arquivos vão dentro do docker
COPY ./ /tmp

# para informar quais pastas serão os próximos comandos
WORKDIR /tmp

# para rodar algo fora do docker (um comando do node por exemplo), usa-se o "RUN"
RUN npm i


#rodar o run build para buildar o código (não rodar o run dev, pois run dev é somente em fase de desenvolvimento)
RUN npm run build

#inicializar informar qual comando deve ser utilizado ao baixar a imagem para iniciar a aplicação
CMD [ "npm", "start" ]

#digitar o comando docker build -f infra/Dockerfile -t node-api:0.0.1 .   para fazer a imagem 

# quando finalizar o docker compose, rodar o seguinte comando no console: docker-compose -f infra/docker-compose.yml up



