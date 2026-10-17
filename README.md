[![GitHub license](https://img.shields.io/github/license/SkvizyBoy/universal-boilerplate?style=flat-square&color=blue)](https://github.com/SkvizyBoy/universal-boilerplate/blob/main/LICENSE)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/SkvizyBoy/universal-boilerplate?style=flat-square)](https://github.com/SkvizyBoy/universal-boilerplate/blob/main/package.json)
![Node.js Version](https://img.shields.io/badge/Node.js-24+-green?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/SkvizyBoy/universal-boilerplate/pulls)
# 🚀 Universal Fullstack Boilerplate

Универсальный монорепозиторий для быстрого старта веб-проектов любого масштаба: SaaS, маркетплейсы, MVP, интернет-магазины, блоги, панели управления и не только. Шаблон уже содержит базовую архитектуру, рабочую БД, API и фронтенд, чтобы ты не тратил время на рутину и сразу начинал писать бизнес-логику.

Этот проект — готовая отправная точка для продукта, который нужно быстро собрать, запустить локально и затем выкатить в продакшн.

---

## 🧩 Что входит в проект

Это монорепозиторий на базе Turbo + pnpm с двумя основными приложениями:

- `apps/web` — фронтенд на Next.js 16 + React 19 + App Router
- `apps/api` — бэкенд на NestJS 12 + TypeScript
- `packages/ui` — переиспользуемые компоненты
- `docker-compose.yml` — PostgreSQL 17 для локальной разработки

---

## 🛠️ Стек технологий

| Компонент | Технология | Зачем выбран |
| --- | --- | --- |
| Монорепозиторий | Turborepo + pnpm | Быстрые сборки, общий dependency graph, удобное управление несколькими приложениями |
| Фронтенд | Next.js 16 + React 19 | Современный App Router, SSR/SSG, производительность и экосистема React |
| Стилизация | Panda CSS | Zero-runtime CSS, типобезопасные стили, удобно для дизайн-систем |
| Бэкенд | NestJS 12 | Структурный и масштабируемый backend для API, хорошая архитектура и DX |
| База данных | PostgreSQL 17 + Drizzle ORM | Надёжная SQL-база и простой, типобезопасный ORM |
| Контейнеризация | Docker + Docker Compose | Локальная разработка и запуск сервисов без геморроя с зависимостями |
| Язык | TypeScript (strict) | Безопасность типов, меньше ошибок на ранних этапах |

---

## ✅ Требования (Prerequisites)

Перед запуском убедись, что всё установлено и работает.

| Инструмент | Версия | Как проверить |
| --- | --- | --- |
| Node.js | 24+ | `node -v` |
| pnpm | 11+ | `pnpm -v` |
| Docker Desktop / Docker Engine | актуальная версия | `docker --version` |
| Git | любая актуальная | `git --version` |

### Установка

```bash
# Node.js 24+
# Скачай с официального сайта: https://nodejs.org/

# pnpm
npm install -g pnpm

# Проверка
node -v
pnpm -v
```

Для Docker:

- macOS / Windows: установи Docker Desktop
- Linux: установи Docker Engine + Docker Compose

Проверка Docker:

```bash
docker --version
docker compose version
```

> Если `node -v` показывает версию ниже 24, обнови Node.js. Иначе проект может вести себя странно.

---

## 🚀 Быстрый старт (Local Development)

Ниже — полный путь "с нуля" до работающего проекта.

### 1. Клонируй репозиторий

```bash
git clone https://github.com/SkvizyBoy/universal-boilerplate.git my-project
cd my-project
```

### 2. Установи зависимости

```bash
pnpm install
```

Если видишь ошибку вида `ERR_PNPM_IGNORED_BUILDS`, смотри раздел "Решение проблем" ниже. В этом шаблоне она уже исправляется через `pnpm-workspace.yaml`.

### 3. Скопируй переменные окружения

В этом проекте `.env.example` лежит в `apps/api`:

```powershell
Copy-Item apps\api\.env.example apps\api\.env
```

Если ты используешь Bash/Zsh или macOS/Linux, то команда будет такой:

```bash
cp apps/api/.env.example apps/api/.env
```

Содержимое файла:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
```

> Важно: это переменная для PostgreSQL, который запускается через Docker Compose.

### 4. Запусти PostgreSQL в Docker

```bash
docker compose up -d
```

Это поднимет контейнер с PostgreSQL 17 и создает базу `app_db`.

Проверить контейнеры:

```bash
docker compose ps
```

### 5. Примените схему БД через Drizzle

Из папки `apps/api`:

```bash
cd apps/api
pnpm exec drizzle-kit push
```

Или из корня проекта:

```bash
pnpm --dir apps/api exec drizzle-kit push
```

Эта команда создаёт/обновляет таблицы по схеме из `apps/api/src/db/schema.ts`.

### 6. Запусти проект в dev-режиме

Из корня проекта:

```bash
cd ..
pnpm dev
```

Если работаешь в корне, то просто:

```bash
pnpm dev
```

Это запустит Turbo, и монорепозиторий поднимет все приложения.

### 7. Открой проект в браузере

- Веб: `http://localhost:3000`
- API: `http://localhost:3001` (если не переопределён через `PORT`)

> Если порт 3000 занят в локальной машине, останови конфликтующий процесс или задай отдельный порт для API через переменную `PORT` перед запуском.

---

## 🚀 Обычный первый запрос к API

После запуска можно быстро проверить, что API живой и отвечает корректно:

```bash
curl http://localhost:3001
```

Ожидаемый ответ:

```text
Hello World!
```

> В чистом шаблоне API не содержит маркетплейс-эндпоинтов, поэтому проверка по корневому роуту — правильный и стабильный smoke-test.

---

## 🐙 Публикация на GitHub

Если репозитория ещё нет, делай так.

### Вариант 1: через GitHub CLI

```bash
git init
git add .
git commit -m "Initial commit"

gh auth login

gh repo create my-project --public --source=. --remote=origin --push
```

### Вариант 2: создать пустой репозиторий на GitHub и подключить

```bash
git remote add origin https://github.com/ВАШ_НИК/ВАШ_РЕПОЗИТОРИЙ.git
git branch -M main
git push -u origin main
```

### Вариант 3: если репозиторий уже есть, просто пушим

```bash
git add .
git commit -m "feat: initial setup"
git push origin main
```

---

## 🌍 Деплой в интернет (Production)

Ниже — два основных варианта.

### Вариант 1: VPS + Docker

Это хороший вариант, если хочешь полностью контролировать окружение и не зависеть от платформенных ограничений.

#### 1. Арендуй VPS

Подходит любой VPS с Ubuntu 22.04/24.04 и минимум 2 vCPU / 4 GB RAM.

#### 2. Подключись по SSH

```bash
ssh root@IP_ВАШЕГО_VPS
```

#### 3. Установи Docker

```bash
apt update
apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Проверь:

```bash
docker --version
docker compose version
```

#### 4. Установи Git и клонируй проект

```bash
apt install -y git
mkdir -p /var/www
cd /var/www
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ> my-project
cd my-project
```

#### 5. Создай `.env` для API

```bash
cp apps/api/.env.example apps/api/.env
nano apps/api/.env
```

Пример:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
```

#### 6. Подними базу данных

```bash
docker compose up -d
```

#### 7. Установи зависимости и собери приложение

```bash
pnpm install
cd apps/api
pnpm build
cd ../web
pnpm build
```

#### 8. Запусти сервисы в продакшн-режиме

В типичной схеме для этого монорепозитория:

- Web запускается на `3000`
- API запускается на `3001`

Для NestJS API:

```bash
cd /var/www/my-project/apps/api
PORT=3001 NODE_ENV=production pnpm start:prod
```

Для Next.js Web:

```bash
cd /var/www/my-project/apps/web
PORT=3000 NODE_ENV=production pnpm start
```

> В продакшне лучше запускать через `systemd`, `PM2` или Docker-контейнеры, но выше — минимально рабочая схема. Явно задавайте порты в конфиге, чтобы не было путаницы между API и frontend.

#### 9. Настройка домена / nginx / reverse proxy

Если у тебя есть домен, обычно делают так:

- API на `api.example.com`
- Web на `example.com`
- Nginx или Caddy проксирует запросы к локальным портам

Пример Nginx для frontend:

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Для API можно добавить отдельный блок:

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

### Вариант 2: Vercel (для фронтенда)

Если вам нужен максимально простой деплой фронтенда, Vercel подходит идеально.

#### 1. Загрузите проект в GitHub

```bash
git add .
git commit -m "ready for deploy"
git push origin main
```

#### 2. Подключите репозиторий в Vercel

- Открой https://vercel.com
- Нажми **Add New Project**
- Выбери GitHub-репозиторий
- В качестве root folder укажи `apps/web`
- Framework preset: **Next.js**

#### 3. Настройте переменные окружения

Для Next.js обычно нужны переменные вида:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

#### 4. Нажмите Deploy

Vercel сам соберёт и задеплоит проект.

> Для production API обычно всё равно нужен отдельный хостинг или контейнер, например VPS, Railway, Render, Fly.io, Azure App Service и т.д.

---

## 🐳 Шпаргалка по Docker

| Команда | Что делает |
| --- | --- |
| `docker compose up -d` | Запускает контейнеры в фоне |
| `docker compose down` | Останавливает и удаляет контейнеры |
| `docker compose down -v` | Останавливает контейнеры и удаляет тома (полный сброс БД) |
| `docker compose ps` | Показывает список запущенных контейнеров |
| `docker compose logs -f` | Смотрит логи всех сервисов |
| `docker compose logs -f db` | Смотрит только логи PostgreSQL |
| `docker compose restart db` | Перезапускает конкретный сервис |
| `docker exec -it app_db psql -U postgres -d app_db` | Подключается к PostgreSQL из контейнера |

Примеры:

```bash
docker compose up -d
docker compose logs -f db
docker compose down
docker compose down -v
```

---

## 🗄️ Работа с базой данных (Drizzle ORM)

### 1. Как добавить новую таблицу

Открывай файл `apps/api/src/db/schema.ts` и добавляй таблицы через `pgTable`.

Пример:

```ts
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

После этого:

- создай логику работы с таблицей в сервисах/контроллерах
- затем применяй миграции

### 2. Локальная разработка: `push`

Для быстрого синка схемы с локальной БД:

```bash
cd apps/api
pnpm exec drizzle-kit push
```

Используй это в локалке, когда тебе не нужна сложная миграционная схема.

### 3. Продакшн: `generate` + `migrate`

Для продакшена обычно делают так:

```bash
cd apps/api
pnpm db:generate
pnpm db:migrate
```

Или напрямую:

```bash
pnpm exec drizzle-kit generate
pnpm exec drizzle-kit migrate
```

Порядок логичный:

1. `generate` — создаёт SQL-миграции по изменениям схемы
2. `migrate` — применяет их к базе

### 4. Drizzle Studio

Чтобы визуально посмотреть БД и таблицы:

```bash
cd apps/api
pnpm db:studio
```

Обычно Drizzle Studio открывается в браузере по адресу:

```text
http://localhost:4983
```

---

## 🧪 Решение проблем (Troubleshooting)

### 1) Ошибка: `ERR_PNPM_IGNORED_BUILDS`

Причина: pnpm по умолчанию блокирует некоторые native builds (например, `esbuild`, `@parcel/watcher`, `sharp`).

Решение: добавь секцию `allowBuilds` в корневой `pnpm-workspace.yaml`.

```yaml
packages:
  - "apps/*"
  - "packages/*"

allowBuilds:
  '@parcel/watcher': true
  esbuild: true
  sharp: true
```

После этого:

```bash
pnpm install
```

> В этом проекте такая настройка уже есть, поэтому проблема обычно исчезает после переустановки зависимостей.

### 2) Ошибка: `database "app_db" does not exist`

Это значит, что PostgreSQL контейнер был запущен, но база с нужным названием не создалась или в volume остались старые данные.

Решение:

```bash
docker compose down -v
docker compose up -d
```

Затем снова примените схему:

```bash
cd apps/api
pnpm exec drizzle-kit push
```

Или просто удалите том `postgres_data` и поднимите контейнер заново.

### 3) Ошибка, если не найден `panda.config.ts`

Причина: либо файл удалён, либо ты запускаешь команду не из нужной директории, либо dependencies не установлены.

Проверить файл:

```bash
ls apps/web
```

Должен быть файл:

```text
apps/web/panda.config.ts
```

Если файл есть, установи зависимости и сгенерируй styled-system:

```bash
cd apps/web
pnpm install
pnpm prepare
```

Если ошибки всё равно есть, проверь, что ты запускаешь команды из корня проекта и что `panda.config.ts` не был случайно удалён.

### 4) `docker compose up -d` не запускается

Проверь:

```bash
docker ps
docker compose logs -f db
```

Убедись, что Docker Desktop запущен, а порт `5432` не занят другим сервисом.

### 5) `pnpm dev` не запускает проекты

Попробуй:

```bash
pnpm install
pnpm dev
```

Или запустите приложения вручную:

```bash
cd apps/api
pnpm install
pnpm start:dev
```

```bash
cd apps/web
pnpm install
pnpm dev
```

---

## ✅ Чек-лист для быстрой работы

Если ты уже знаком с проектом, вот минимальный список действий:

- [ ] `pnpm install`
- [ ] `cp apps/api/.env.example apps/api/.env`
- [ ] `docker compose up -d`
- [ ] `cd apps/api && pnpm exec drizzle-kit push`
- [ ] `pnpm dev`
- [ ] Открыть фронтенд и API
- [ ] Расширить `schema.ts` под свою доменную модель
- [ ] Закоммитить/запушить изменения
- [ ] Подготовить деплой и переменные окружения для production

---

## 📌 Коротко

Если тебе нужен быстрый старт для любого веб-продукта, этот шаблон уже даёт:

- современный стек
- готовый монорепозиторий
- PostgreSQL в Docker
- NestJS API
- Next.js фронтенд
- Panda CSS
- TypeScript
- Drizzle ORM

То есть ты можешь сразу думать о продукте, а не о настройке инфраструктуры.

---

Если хочешь, следующим сообщением я могу сразу подготовить ещё и:

- `apps/api/.env.example` в более "продакшн"-варианте
- шаблон `docker-compose.prod.yml`
- пример `.github/workflows/ci.yml`
- структуру для SaaS/маркетплейса/блога на базе этого монорепозитория
