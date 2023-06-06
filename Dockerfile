FROM deadolus/android-studio:latest AS build 

FROM beevelop/cordova:latest

WORKDIR /app

COPY . .

RUN npm install && \
    cordova prepare

EXPOSE 8000
