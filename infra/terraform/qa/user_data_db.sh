#!/bin/bash
set -euxo pipefail

yum update -y
amazon-linux-extras install docker -y
systemctl enable docker
systemctl start docker
usermod -aG docker ec2-user

curl -L "https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

yum install -y git

mkdir -p /opt/gradpulse
chown -R ec2-user:ec2-user /opt/gradpulse

cd /opt/gradpulse
rm -rf repo || true
sudo -u ec2-user git clone -b qa https://github.com/RAlexis14/gradpulse-microservices.git repo

cd /opt/gradpulse/repo

# IMPORTANT: confirm this path exists in your repo:
docker-compose -f infra/database-stack/docker-compose.yml up -d

docker ps
echo "DB_READY" > /home/ec2-user/DB_READY.txt
