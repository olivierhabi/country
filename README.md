[![Nextjs Test & Build](https://github.com/olivierhabi/country/actions/workflows/build.yml/badge.svg)](https://github.com/olivierhabi/country/actions/workflows/build.yml)
![coverage-branches](https://github.com/olivierhabi/country/blob/develop/badges/coverage-branches.svg)
![coverage-functions](https://github.com/olivierhabi/country/blob/develop/badges/coverage-functions.svg)
![coverage-global coverage](https://github.com/olivierhabi/country/blob/develop/badges/coverage-global%20coverage.svg)
![coverage-lines](https://github.com/olivierhabi/country/blob/develop/badges/coverage-lines.svg)
![coverage-statements](https://github.com/olivierhabi/country/blob/develop/badges/coverage-statements.svg)


# Country

## This project use the following technology:
- `typescript v4.4.3`
- `node v14.17.4`
- `Postgresql`
- `yarn 1.22.10`
- `Github-action to run build and test`
- `Tailwindcss`
- `Next-auth Authentication`
- `Unit test with Jest and React testing-library`



## Steps to run this project
- `git clone https://github.com/olivierhabi/country.git`
- `cd country`
- `yarn install`
- Add enviroment variables find example here [.env.sample](/.env.sample)
- `yarn run db:push` to synchronize your Prisma schema with database schema
- `yarn run dev`

## Running Tests
- `yarn run test`

## Commands and uses:
- `yarn generate` to generate Prisma Client
- `yarn build` Build Project for production
- `yarn migrate:reset` Reset Migration