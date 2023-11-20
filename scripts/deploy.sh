echo "> 현재 실행 중인 Docker 컨테이너 pid 확인" >> /home/ec2-user/deploy.log
CURRENT_PID=$(sudo docker container ls -q)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 Docker 컨테이너가 없으므로 종료하지 않습니다." >> /home/ec2-user/deploy.log
else
  echo "> sudo docker stop $CURRENT_PID"   # 현재 구동중인 Docker 컨테이너가 있다면 모두 중지
  sudo docker stop $CURRENT_PID
  sleep 5
fi

cd /home/ec2-user/app/step2/zip/  # 해당 디렉토리로 이동 (Dockerfile 을 해당 디렉토리에 옮겼기 때문에)
sudo docker stack deploy --compose-file docker-compose.yml bael_stack
sudo docker-compose up -d
