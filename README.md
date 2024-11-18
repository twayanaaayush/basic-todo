# Basic Todo

## Backend
Add .env file, an example file is available to `copy & paste`.
For the `DB_URI` field, include `srv` connection string.

### Build

```
$ pnpm run init
$ pnpm run build
```

### Run:dev

```
$ pnpm run init
$ pnpm run start:dev
```

### Run:prod

```
$ pnpm run start:prod
```

## API Documentation

https://documenter.getpostman.com/view/32334452/2sAYBPnEeS

## Frontend

Make sure the backend server is running.

Change the base url for the backend by editing the `API_URL` field in `frontend/src/api/base.ts`.

### Build

```
$ pnpm run build
```

### Run:dev

```
$ pnpm run start
```
