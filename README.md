<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<p style="font-size: 20px; font-weight: bold;" align="center">NestJS</p>

## Description

NestJS framwork 기반 monorepo 프로젝트입니다.

## Prerequisites

- [direnv](https://direnv.net/)
- [nvm](https://github.com/nvm-sh/nvm)
- Docker
- Node.js 22.13.0
- pnpm

## Teck Stack

- Framework: [NestJS](https://docs.nestjs.com)
- ORM: [TypeORM](https://typeorm.io)
- Database: [PostgreSQL](https://www.postgresql.org), [PGLite](https://pglite.dev)
- Testing: [Jest](https://jestjs.io), @nestjs/testing, supertest

## Project Setup

workspace는 direnv로 관리합니다. 최초 진입시 `direnv allow` 명령어를 수행합니다.

```bash
# install dependencies
$ pnpm install

# run postgres docker
$ pnpm db

# run database sync using migrations
$ pnpm migration:run -d ormconfig.ts

# run project (example. pnpm start:dev main-app)
$ pnpm start:dev {app name}
```

## Database Migrations

`migrations` 디렉토리에 Migration 코드를 확인할 수 있습니다.
`ormconfig.ts`를 참고하여 migration 명령어를 수행합니다.

```bash
# create new migration (local database 기준으로 schema 변경점에 대한 migration 파일 생성합니다.)
$ pnpm migration:gen

# run migration
$ pnpm migration:run -d {ormconfig file path}

# revert migration
$ pnpm migration:revert -d {ormconfig file path}
```

## Environment Variables

환경변수는 .env 파일을 생성하여 설정할 수 있습니다.
각 모듈별 `{name}.config.ts` 를 참고하세요. <br>
테스트용 환경변수는 `.env.test` 파일을 생성하여 설정할 수 있습니다.

```bash
# example .env
PORT=4000
ENABLED_SWAGGER=true
...
```

## Run Tests

테스트환경에서 Database는 `PGLite`를 default로 사용합니다.
jest 설정은 `jest.config.json` 파일을 참고하세요.

```
# run all tests
$ pnpm jest

# run specific test
$ pnpm jest {test regex}
```

## Project Structure

apps: Application 이 존재합니다. <br>
libs: Application 을 구성하는 공통 모듈, 비지니스 로직 등 존재합니다. <br>
migrations: Database Migration (TypeORM) 이 존재합니다. <br>

```
(root)
├─ apps/                          # Applications
│   └─ (app)/
│
├─ libs/
│   └─ (module)
│         ├─ src/
│         │   ├─ config/
│         │   ├─ entities/
│         │   ├─ repository/
│         │   ├─ service/
│         │   └─ (lib).module.ts
│         └─ test/
├── migrations/
└── res/
    └── docker-compose.yml   # Docker Compose (Infrastructure)
```
