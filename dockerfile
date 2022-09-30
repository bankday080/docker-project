FROM node
ENV NODE_ENV=production
WORKDIR /app
COPY . /app/
RUN npm install --production
EXPOSE 3000
CMD ["node",'index.js']

LABEL maintainer="philip.ackermann@cedalo.com"

ARG CEDALO_MC_BUILD_DATE
ENV CEDALO_MC_BUILD_DATE=${CEDALO_MC_BUILD_DATE}
ARG CEDALO_MC_BUILD_NUMBER
ENV CEDALO_MC_BUILD_NUMBER=${CEDALO_MC_BUILD_NUMBER}
ENV CEDALO_MC_PROXY_CONFIG=/management-center/config/config.json
ENV CEDALO_MC_PROXY_HOST=0.0.0.0
# RUN apk --no-cache add g++ make bash curl gnupg 
