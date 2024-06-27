location /prod-api/ {
proxy_pass https://api.moonc.love/;
# 暴露真实IP
proxy_set_header X-Real-IP $remote_addr;
}