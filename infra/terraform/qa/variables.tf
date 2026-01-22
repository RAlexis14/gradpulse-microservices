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

# Tu IP pública /32 (ej: 38.51.35.8/32)
variable "ssh_allowed_cidr" {
  type = string
}

variable "key_name" {
  type    = string
  default = "gradpulse-qa-key"
}

# AMI ID fijo (evita DescribeImages si el lab molesta)
variable "ami_id" {
  type = string
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
