# Práctica de Servidor Apache con Docker

Considera el siguiente comando para iniciar el contenedor y mandar una petición.

```shell
docker run -d --name servidor-apache -p 8080:80 -v "${PWD}/sitio:/usr/local/apache2/htdocs:ro" httpd:2.4
curl.exe -I http://localhost:8080
```