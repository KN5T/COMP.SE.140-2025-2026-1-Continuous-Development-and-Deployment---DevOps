FROM node
WORKDIR /app/storage
COPY package.json /app/storage
RUN npm install
COPY . /app/storage
EXPOSE 5001
CMD ["node", "app.js"]