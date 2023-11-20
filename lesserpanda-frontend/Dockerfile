FROM  node:16.14-alpine

WORKDIR /app

# ENV PATH /home/ec2-user/lesser-panda/lesserpanda-frontend/node_modules/.bin:$PATH

COPY package.*json /app/package.json

# RUN npm install
RUN npm install --save-dev ajv --legacy-peer-deps
COPY . .

# RUN npm install react-scripts@3.4.1 -g

EXPOSE 3000

CMD ["npm","start"]






