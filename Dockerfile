# 1. Usamos una imagen de Node oficial (el cimiento)
FROM node:20
# 2. Creamos una carpeta dentro del contenedor para nuestra app
WORKDIR /app
# 3. Copiamos los archivos de dependencias
COPY package*.json ./
# 4. Instalamos las librerías
RUN npm install
# 5. Copiamos el resto de tu código (tu backend incompleto)
COPY . .
# 6. Exponemos el puerto que usa tu Express (ejemplo: 3000)
EXPOSE 3000
# 7. El comando para encender la chispa
CMD ["npm", "start"]
