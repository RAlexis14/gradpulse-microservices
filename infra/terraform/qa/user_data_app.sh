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

sudo -u ec2-user bash -lc "
cd /opt/gradpulse
rm -rf repo || true
git clone -b qa https://github.com/RAlexis14/gradpulse-microservices.git repo
cd repo

# Create env folder (NOT in git)
mkdir -p infra/qa/env

# -----------------------------
# Create gateway.env
# -----------------------------
cat > infra/qa/env/gateway.env << 'EOF'
ENV=qa
CORS_ALLOW_ORIGIN=*
CORS_ALLOW_METHODS=GET,POST,PUT,PATCH,DELETE,OPTIONS
CORS_ALLOW_HEADERS=Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Requested-With
CORS_EXPOSE_HEADERS=Authorization,Content-Type
CORS_MAX_AGE=86400
EOF

# -----------------------------
# Create service env files
# IMPORTANT: replace each EOF content with your final envs if needed
# -----------------------------

cat > infra/qa/env/user-login-service.env << 'EOF'
DB_HOST=10.10.21.137
DB_PORT=5432
DB_NAME=users_db
DB_USER=gradpulse
DB_PASSWORD=gradpulse123
JWT_SECRET_KEY=qa-secret
JWT_ALGORITHM=HS256
JWT_EXP_MINUTES=60
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/user-logout-service.env << 'EOF'
REDIS_URL=redis://10.10.21.137:6379/0
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/student-profile-service.env << 'EOF'
DB_HOST=10.10.21.137
DB_PORT=5432
DB_NAME=academic_db
DB_USER=gradpulse
DB_PASSWORD=gradpulse123
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/community-hours-service.env << 'EOF'
DB_HOST=10.10.21.137
DB_PORT=5432
DB_NAME=community_db
DB_USER=gradpulse
DB_PASSWORD=gradpulse123
COMMUNITY_REQUIRED_HOURS=160
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/community-programs-service.env << 'EOF'
MONGO_URI=mongodb://10.10.21.137:27017
MONGO_DB=community_db
MONGO_COLLECTION=programs
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/internships-hours-service.env << 'EOF'
DB_HOST=10.10.21.137
DB_PORT=5432
DB_NAME=internships_db
DB_USER=gradpulse
DB_PASSWORD=gradpulse123
INTERNSHIPS_REQUIRED_HOURS=240
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/internships-offers-service.env << 'EOF'
MONGO_URI=mongodb://10.10.21.137:27017
MONGO_DB=internships_db
MONGO_COLLECTION=offers
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/english-courses-service.env << 'EOF'
MONGO_URI=mongodb://10.10.21.137:27017
MONGO_DB=languages_db
MONGO_COLLECTION=english_courses
MONGO_TIMEOUT_MS=3000
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/english-level-service.env << 'EOF'
DB_HOST=10.10.21.137
DB_PORT=5432
DB_NAME=languages_db
DB_USER=gradpulse
DB_PASSWORD=gradpulse123
FLASK_ENV=qa
ENV=qa
EOF

# TODO: create envs for these 3 if your services need different names:
# user-role-service.env
# user-profile-service.env
# user-verification-service.env

cat > infra/qa/env/user-role-service.env << 'EOF'
DB_HOST=10.10.21.137
DB_PORT=5432
DB_NAME=users_db
DB_USER=gradpulse
DB_PASSWORD=gradpulse123
JWT_SECRET_KEY=qa-secret
JWT_ALGORITHM=HS256
JWT_EXP_MINUTES=60
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/user-profile-service.env << 'EOF'
DB_HOST=10.10.21.137
DB_PORT=5432
DB_NAME=users_db
DB_USER=gradpulse
DB_PASSWORD=gradpulse123
FLASK_ENV=qa
ENV=qa
EOF

cat > infra/qa/env/user-verification-service.env << 'EOF'
DB_HOST=10.10.21.137
DB_PORT=5432
DB_NAME=users_db
DB_USER=gradpulse
DB_PASSWORD=gradpulse123
FLASK_ENV=qa
ENV=qa
EOF

# Pull and run app stack
docker-compose -f infra/qa/docker-compose.app.yml pull
docker-compose -f infra/qa/docker-compose.app.yml up -d

docker ps
echo 'APP_READY' > /home/ec2-user/APP_READY.txt
"
