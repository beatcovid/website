# COVID-19 Survey

## Install

Install package requirements

```sh
$ yarn install
```

## Environment Setup

create a `.env.development` file with the environment variables the project requires based on the `.env.example` file

| Variable                 | Required | Purpose                                    | Example                         |
| :----------------------- | :------- | :----------------------------------------- | ------------------------------- |
| REACT_APP_API_ENDPOINT   | `true`   | API endpoint                               | `http://127.0.0.1:8000`         |
| REACT_APP_FORM_NAME      | `false`  | Override default form                      | `beatcovid19now`                |
| REACT_APP_SENTRY_DSN     | `false`  | Sentry endpoint                            | `https://111111@sentry.io/2222` |
| REACT_APP_ANALYTICS_ID   | `false`  | Analytics ID                               | `UA-1111111`                    |
| REACT_APP_MAPBOX_API_KEY | `false`  | Mapbox public token (not `sk.`)            |                                 |
| BROWSER                  | `false`  | Browser to open                            | `none` or `chromium`            |
| REACT_APP_VERSION        | `false`  | Set the application version (display only) | `$npm_package_version`          |

## Running

```sh
$ yarn start
```

Server will be available and reporting on port `3000` by default and live reloading any development changes

## Development

Checkout a branch with `feat` `fix` etc. prefix tags

Commit and bump minor version with:

```sh
$ yarn version --patch
```

It will be linted and commited
