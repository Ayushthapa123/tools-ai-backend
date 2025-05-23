### HOSTELADMIN BACKEND 

NOte: Reason for not creating Enums as types seems to be being not used in .dto files.



### Docker Image creation flow 
1.Change .env according to production credentials
2.docker build -t ayushthapa007/hosteladmin-nest:latest . 
3. docker run -d -p 3003:3003 --name hosteladmin-container ayushthapa007/hosteladmin-nest
4. docker tag e79e7cb6e030 ayushthapa007/hosteladmin-nest:latest
5. docker push ayushthapa007/hosteladmin-nest:latest




# On railway. 
1. deploy the docker image from the deployment tab
2. Then go to settings/network and generate domain