FROM node:10.11 as react-build

WORKDIR /home/node
COPY --chown=node:node . .

USER node
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /home/node/build /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]