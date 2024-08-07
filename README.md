# Prerequisites

- node
- docker
- docker-compose

# Run dev

1. Run `git clone https://github.com/monadosquito/itworkin`.
2. Run `cd itworkin`.
3. Run `npm install` (workaround).
4. Run `docker-compose -f compose-dev.yaml up --build`.
5. Visit `http://localhost:5000`.

# Run prod

1. Run `git clone https://github.com/monadosquito/itworkin`.
2. Run `cd itworkin`.
3. Run `npm install` (workaround).
4. Run `docker-compose -f compose-prod.yaml up --build`.
5. Create telegram bot with link to the build products.
6. Install https://gitlab.itworkin.com/itworkin_public/test_frontend.git.
7. Visit the created telegram bot.

# Notes

- A demo-version without requests can be found at `@wild_tapalka_bot` telegram bot or here `https://monadosquito.github.io/itworkin/`.
