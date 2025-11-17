# ---------------------------------------------------
# 1. Etapa de Dependencias (deps)
# ---------------------------------------------------
FROM node:18-alpine AS deps
# libc6-compat es necesario a veces para ciertas librerías en Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiamos solo los archivos de dependencias para aprovechar el caché de Docker
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Instalamos dependencias según el gestor de paquetes detectado
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ---------------------------------------------------
# 2. Etapa de Construcción (builder)
# ---------------------------------------------------
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desactivamos telemetría de Next.js durante el build
ENV NEXT_TELEMETRY_DISABLED=1

# Construimos la app
RUN npm run build

# ---------------------------------------------------
# 3. Etapa de Ejecución (runner)
# ---------------------------------------------------
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Creamos un usuario no-root por seguridad (Buenas Prácticas)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos solo lo necesario del modo 'standalone'
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
# El host 0.0.0.0 es necesario para acceder desde fuera del contenedor
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]