#!/bin/bash
set -euxo pipefail

yum update -y
amazon-linux-extras install docker -y
systemctl enable docker
systemctl start docker
usermod -aG docker ec2-user

# Docker Compose v2
curl -L "https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

yum install -y git

# Workspace
mkdir -p /opt/gradpulse
chown -R ec2-user:ec2-user /opt/gradpulse

# Clone repo (QA branch)
sudo -u ec2-user bash -lc "
cd /opt/gradpulse
rm -rf repo || true
git clone -b qa https://github.com/RAlexis14/gradpulse-microservices.git repo
cd repo

# Start DB stack
docker-compose -f infra/database-stack/docker-compose.yml up -d

docker ps
echo 'DB_READY' > /home/ec2-user/DB_READY.txt
"
