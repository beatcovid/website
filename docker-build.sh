docker build -t stopcovid/web \
  --build-arg REACT_APP_SENTRY_DSN \
  --build-arg REACT_APP_API_ENDPOINT \
  --build-arg REACT_APP_ANALYTICS_ID \
  --build-arg REACT_APP_MAPBOX_API_KEY .


docker push stopcovid/web
