# reto-tecnico
reto tecnico
# deploy
sam deploy --template-file template.yaml --stack-name indra-backend --capabilities CAPABILITY_IAM --s3-bucket fernet-indra-lambda
# test
ingresar a la carpeta functions. <br>
luego ejecuar npm run test
# probar swagger
ingresar a https://editor.swagger.io/ copiar el codigo de swagger.yaml y realizar las consultas