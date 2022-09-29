FROM node
ENV NODE_ENV=production
WORKDIR /app
COPY . /app/
RUN npm install --production
EXPOSE 3000
CMD ["node",'index.js']