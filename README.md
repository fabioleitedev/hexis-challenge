# Hexis Code Challenge

Created by Fábio Leite
fabioleitedev@gmail.com
[linkedin.com/fabioleitedev](https://www.linkedin.com/in/fabioleitedev)

## What is this challenge?

This API accepts a single parameter named url and returns a simple sitemap including the first level links of this url.

## Pre-requisites

* [Docker](https://www.docker.com)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js >= v14](https://nodejs.org/en)
* You can use NPM (included in Node.js) or [Yarn](https://yarnpkg.com)

## First steps

* Clone this repo
* Go to `src` folder.
* Create the `.env` file following the `.env.sample` file.
* Go to root folder.
* Run `./build.sh` script. It'll create the Docker image of the project.

## Running 100% with containers

* Run `./start.sh`.

## Running locally

* Run `./start-local.sh`. It'll only start the Redis container required to run the project.
* Run `npm start` or `yarn start`.

## Testing

To run tests (locally), type `npm run test` or `yarn test`

## Kubernetes

I left a `deployment.yaml` as an example to deploy it in K8S.

## Consuming the API

### (GET) /sitemaps/v1/urls

* Returns the sitemap including all the links of a given web page url.
* Requires a url query parameter with a web page url.
* Endpoint example: `localhost:5000/sitemaps/v1/urls?url=https://www.google.com`
* Response example:

```javascript
{
"success": true,
  "data": [
    {
      "href": "https://www.google.pt/imghp?hl=pt-PT&tab=wi"
    },
    {
      "href": "https://maps.google.pt/maps?hl=pt-PT&tab=wl"
    },
    {
      "href": "https://play.google.com/?hl=pt-PT&tab=w8"
    },
    {
      "href": "https://www.youtube.com/?gl=PT&tab=w1"
    },
    {
      "href": "https://news.google.com/?tab=wn"
    },
    {
      "href": "https://mail.google.com/mail/?tab=wm"
    },
    {
      "href": "https://drive.google.com/?tab=wo"
    },
  ]
}
```
