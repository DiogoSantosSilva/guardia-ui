# Etapa 1: Construir a aplicação Vue.js
FROM node:14 as build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos do projeto para o contêiner
COPY . .

# Construir a aplicação Vue.js para produção
RUN npm run build

# Etapa 2: Executar a aplicação com um servidor leve
FROM nginx:1.21-alpine

# Copiar o resultado da compilação da etapa anterior para o diretório de implantação do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Substituir o arquivo de configuração padrão do Nginx pelo nosso
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80 para acesso externo
EXPOSE 8080

# Comando para iniciar o servidor Nginx e executar a aplicação Vue.js
CMD ["nginx", "-g", "daemon off;"]