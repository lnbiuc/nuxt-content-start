---
navigation:
  title: 'Proxy Settings'
  description: ''
  date: '2023-11-27'
  tags: ['npm']
  views: '32'
---

# Windows CMD

```bash
# 设置http代理
set http_proxy=http://127.0.0.1:7890
set https_proxy=http://127.0.0.1:7890

# 设置socks5代理
set http_proxy=socks5://127.0.0.1:7890
set https_proxy=socks5://127.0.0.1:7890

# 取消代理
set http_proxy=
set https_proxy=
```

# PowerShell

```bash
$Env:http_proxy="http://127.0.0.1:7890";
$Env:https_proxy="http://127.0.0.1:7890";
```

# Git

```bash
# 设置http代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 设置socks5代理(可选)
git config --global http.proxy "socks5://127.0.0.1:7890"
git config --global https.proxy "socks5://127.0.0.1:7890"

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

# Bash

```bash
# 设置http代理
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"

# 设置socks5代理
export http_proxy="socks5://127.0.0.1:7890"
export https_proxy="socks5://127.0.0.1:7890"

# 取消代理
unset http_proxy
unset https_proxy
```

# npm

```bash
# 设置http代理
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

# 取消代理
npm config delete proxy
npm config delete https-proxy

# NPM Mirror
npm config set registry https://registry.npmmirror.com

# 查看
npm config get registry

# 使用一次
npm install --registry=http://registry.npmmirror.com

# 删除
npm config delete registry
```
