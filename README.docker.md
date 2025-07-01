# Docker Deployment Guide

Este proyecto incluye configuración Docker para despliegue fácil usando Docker Compose y Portainer.

## Archivos incluidos

- `Dockerfile` - Configuración para construir la imagen Docker
- `docker-compose.yml` - Configuración para orquestación de servicios
- `.env.example` - Variables de entorno de ejemplo

## Uso con Docker Compose

### 1. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus valores específicos
```

### 2. Construir y ejecutar

```bash
# Construir y ejecutar en segundo plano
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### 3. Acceder a la aplicación

La aplicación estará disponible en `http://localhost:3000` (o el puerto configurado en `.env`).

## Uso con Portainer

### 1. Crear un nuevo Stack en Portainer

1. Accede a tu instancia de Portainer
2. Ve a "Stacks" > "Add stack"
3. Nombra el stack (ej: "design-system")

### 2. Configurar el stack

**Opción A: Desde repositorio Git**
- Selecciona "Git repository"
- URL del repositorio: `https://github.com/tu-usuario/tu-repo.git`
- Compose path: `docker-compose.yml`

**Opción B: Copiar contenido**
- Selecciona "Web editor"
- Copia el contenido de `docker-compose.yml`

### 3. Variables de entorno

En la sección "Environment variables" de Portainer, agrega:

```
PORT=3000
DOMAIN=tu-dominio.com
```

### 4. Desplegar

Haz clic en "Deploy the stack"

## Configuración avanzada

### Con Traefik (Reverse Proxy)

Si usas Traefik como reverse proxy, las labels ya están configuradas:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.design-system.rule=Host(`tu-dominio.com`)"
  - "traefik.http.services.design-system.loadbalancer.server.port=80"
```

### Variables de entorno disponibles

- `PORT` - Puerto a exponer (default: 3000)
- `DOMAIN` - Dominio para el reverse proxy (default: localhost)
- `NODE_ENV` - Entorno de Node.js (default: production)

## Troubleshooting

### Problemas comunes

1. **Puerto ya en uso**: Cambia el puerto en `.env`
2. **Permisos**: Asegúrate de que Docker tenga permisos necesarios
3. **Build fallido**: Verifica que todas las dependencias estén en `package.json`

### Logs y debugging

```bash
# Ver logs del contenedor
docker-compose logs design-system

# Acceder al contenedor
docker-compose exec design-system sh

# Reconstruir sin cache
docker-compose build --no-cache
```

## Monitoreo y mantenimiento

### Actualizar la aplicación

```bash
# Reconstruir con cambios
docker-compose up --build -d

# O recrear completamente
docker-compose down
docker-compose up --build -d
```

### Backups

```bash
# Exportar configuración
docker-compose config > backup-compose.yml

# Backup de volúmenes (si los usas)
docker run --rm -v design-system_data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data
```