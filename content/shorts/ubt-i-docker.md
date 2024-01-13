---
navigation:
  title: 'Install Docker on Ubuntu'
  description: 'null'
  date: '2023-11-26'
  cover: 'https://r2-img.lnbiuc.com/blog/2023/11/57b72eb27ce68121914618450581d9ae.png'
  tags: ['docker', 'ubuntu']
  views: '11'
---

```shell
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

```shell
# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```shell
sudo apt-get update
```

install the latest version

```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

finish

```shell
sudo docker run hello-world
```
