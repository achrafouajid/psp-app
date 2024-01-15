#!/bin/sh



ssh ashraf@195.35.24.192 <<EOF
cd ./psp-bi-msh  
git reset --hard HEAD
git pull
npm i 
npx prisma db push
npm run build 
EOF