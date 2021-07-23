# 서버 사이드 렌더링

-   NGINX를 통해 구현
-   설정

```conf
    server {
        listen       8080;
        server_name  localhost;

        location /api/ {
		proxy_pass		http://localhost:4000;
		proxy_set_header		Upgrade	$http_upgrade;
		proxy_set_header		Connection	'upgrade';
		proxy_set_header		Host		$host;
		proxy_cache_bypass		$http_upgrade;
        }

	location / {
		proxy_pass			http://localhost:5000;
		proxy_set_header	Upgrade	$http_upgrade;
		proxy_set_header	Connection	'upgrade';
		proxy_set_header	Host			$host;
		proxy_cache_bypass	$http_upgrade;
	}

	location /static {
		alias D:\CGS\CGS\git\STUDY\PROJECT\blog\blog-frontend\build\static;
	}
}
```

-   package.json - proxy를 공통 포트인 8080으로 설정하니 cross origin 없어짐
-   axios.defaults.baseURL 하면 cross origin 뜸
