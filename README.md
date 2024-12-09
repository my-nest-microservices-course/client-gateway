# Product microservice

## Dev

1- Clone repository
2- Install dependencies
3- Create `.env` file with environment variables with `.template.env`
5- Run `npm run start:dev`

### Command to run NATS server

Basic command:

```bash
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

Run without 6222:6222

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

Test NATS server going to: `http://localhost:8222/`
