# Awesome-Arcade-Extensions-Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blue?logo=vercel)](https://awesome-arcade-extensions.vercel.app/)
[![Uptime](https://img.shields.io/uptimerobot/ratio/m794171188-6455a1d3da81f48d1cda84e9?label=Uptime)](https://stats.uptimerobot.com/pjpkZH9Y0k)
[![Lint](https://github.com/LogicalSimulator/LogicalSimulator/actions/workflows/eslint.yml/badge.svg)](https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/actions/workflows/eslint.yml)
[![Format](https://github.com/LogicalSimulator/LogicalSimulator/actions/workflows/prettier.yml/badge.svg?branch=main)](https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/actions/workflows/prettier.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/unsignedarduino/awesome-arcade-extensions-website/badge)](https://www.codefactor.io/repository/github/unsignedarduino/awesome-arcade-extensions-website)

<!-- [![Contribute with Gitpod](https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod)](https://gitpod.io/#https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/tree/staging) -->

This is the source code for the Awesome Arcade Extensions website!

## Install

1. Have `nodejs`.
2. Clone this repo.
3. `yarn` to install dependencies.
4. Deploy to Vercel and link the project.
5. Copy `.env.sample` to `.env.local` and fill out environment variables.
   Push them to Vercel.
6. Create a new Postgres database on your computer for development.
7. Insert click counts into your local Postgres database using any tool manually for development. 💀💀💀

When hosting on Vercel:

9. Create a new Vercel Postgres database and pull the environment variables in for production.
10. Insert click counts using the Vercel Storage dashboard manually for production. 💀💀💀

## Development

Use `yarn run dev` to start a development server.

Before commit, make sure to format, (`yarn run format` / `yarn run writeFormat`) lint, (`yarn run lint` / `yarn run writeLint`) and type-check. (`yarn run typecheck`)

## Build and serve

`yarn run build` and `yarn run start`.

Awesome Arcade Extensions is currently deployed on Vercel at [https://awesome-arcade-extensions.vercel.app/](https://awesome-arcade-extensions.vercel.app/).
