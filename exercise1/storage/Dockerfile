FROM node
WORKDIR /app/storage
COPY package.json /app/storage
RUN npm install
COPY . /app/storage
CMD ["node", "app.js"]