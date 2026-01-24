variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "aws_profile" {
  type    = string
  default = "gradpulse-pro"
}

variable "project_name" {
  type    = string
  default = "gradpulse"
}

variable "environment" {
  type    = string
  default = "pro"
}

# Your public IP /32 (e.g., 38.51.35.8/32)
variable "ssh_allowed_cidr" {
  type = string
}

variable "key_name" {
  type        = string
  default     = "gradpulse-qa-key"
  description = "EC2 key pair name"
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

variable "public_key_path" {
  type        = string
  description = "Path to the SSH public key (.pub) file"
}
