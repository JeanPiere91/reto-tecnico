# reto-tecnico
Reto Técnico
# deploy
sam deploy --template-file template.yaml --stack-name reto-tecnico --capabilities CAPABILITY_IAM --s3-bucket reto-tecnico
# test
ingresar a la carpeta functions. <br>
luego ejecutar npm run test
# probar swagger
ingresar a https://editor.swagger.io/ copiar el codigo de swagger.yaml y realizar las consultas