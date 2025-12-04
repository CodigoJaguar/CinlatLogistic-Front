# Primera etapa copia y compilacioon
FROM node:22-alpine AS build

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build -- --configuration production

# Segunda etapa
FROM nginx:alpine AS final

COPY --from=build /app/dist/ArmorCounter/browser /usr/share/nginx/html

# IMPORTANTE: Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# ✅ DEBUG: Verificar qué se copió a nginx
RUN echo "=== ARCHIVOS EN NGINX ==="
RUN ls -la /usr/share/nginx/html/
RUN echo "=== ¿EXISTE INDEX.HTML? ==="
RUN test -f /usr/share/nginx/html/index.html && echo "✅ SÍ" || echo "❌ NO"

EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]