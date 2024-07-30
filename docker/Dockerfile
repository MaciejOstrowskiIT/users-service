FROM node:18 AS base

RUN mkdir -p /workspace/
RUN mkdir -p /workspace/users-service

WORKDIR /workspace/users-service

FROM base AS build_users-service

WORKDIR /workspace/users-service

COPY ./users-service/package.json /workspace/users-service/
COPY ./users-service/package-lock.json /workspace/users-service/
RUN npm install

COPY ./users-service /workspace/users-service/
RUN npm run build
# Copy source code
USER node
# Start the application
COPY --from=build /workspace/users-service/dist ./dist

CMD ["dist/index.js"]
# CMD ["npm", "run", "server"]
