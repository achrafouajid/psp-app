#!/bin/sh



ssh ashraf@195.35.24.192 <<EOF
cd ./psp-bi-msh  
git reset --hard HEAD
git pull
npm i 
npm run build 
systemctl restart psp
EOF