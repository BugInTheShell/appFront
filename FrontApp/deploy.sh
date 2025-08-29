echo "Iniciando proceso de deploy a producción (Aguas)"

echo "Construyendo app..."

npm run build

echo "Subiendo archivos a server..."

scp -r dist/* root@191.101.1.4:/usr/share/nginx/html/

echo "Listo! :D"






alias prodb="ga . && git commit -m "add ( Subida a produccion para pruebas ) && git push origin " 