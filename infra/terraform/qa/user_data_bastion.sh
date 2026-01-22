#!/bin/bash
set -euxo pipefail
yum update -y
yum install -y git
echo "BASTION_READY" > /home/ec2-user/BASTION_READY.txt
