FROM node
WORKDIR /app/service1
COPY package.json /app/service1
RUN npm install
COPY . /app/service1
CMD ["node", "app.js"]