variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "aws_profile" {
  type    = string
  default = "gradpulse-qa"
}

variable "project_name" {
  type    = string
  default = "gradpulse"
}

variable "environment" {
  type    = string
  default = "qa"
}

variable "ssh_allowed_cidr" {
  type = string
}

variable "ami_id" {
  type = string
}

variable "key_name" {
  description = "Existing EC2 key pair name in AWS Academy (often vockey)"
  type        = string
}

variable "instance_type_bastion" {
  type    = string
  default = "t3.micro"
}

variable "instance_type_app" {
  type    = string
  default = "t3.small"
}

variable "instance_type_db" {
  type    = string
  default = "t3.small"
}
