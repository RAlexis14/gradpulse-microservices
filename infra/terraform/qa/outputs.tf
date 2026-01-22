output "alb_dns_name" {
  value = aws_lb.alb.dns_name
}

output "bastion_public_ip" {
  value = aws_eip.bastion_eip.public_ip
}

output "app_private_ip" {
  value = aws_instance.app.private_ip
}

output "db_private_ip" {
  value = aws_instance.db.private_ip
}

output "ssh_bastion" {
  value = "ssh -i <PRIVATE_KEY_PATH> ec2-user@${aws_eip.bastion_eip.public_ip}"
}

output "ssh_app_via_bastion" {
  value = "ssh -i <PRIVATE_KEY_PATH> -J ec2-user@${aws_eip.bastion_eip.public_ip} ec2-user@${aws_instance.app.private_ip}"
}

output "ssh_db_via_bastion" {
  value = "ssh -i <PRIVATE_KEY_PATH> -J ec2-user@${aws_eip.bastion_eip.public_ip} ec2-user@${aws_instance.db.private_ip}"
}
