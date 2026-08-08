# syntax=docker/dockerfile:1

FROM ghcr.io/puppeteer/puppeteer:24.43.1

ARG DEPLOY_SHA=local
LABEL org.coderdojo.cambridge.service="web" \
  org.opencontainers.image.revision="$DEPLOY_SHA"

USER root
RUN corepack enable \
  && mkdir -p /app \
  && mkdir -p /app/data \
  && chown -R pptruser:pptruser /app

USER pptruser
WORKDIR /app

COPY --chown=pptruser:pptruser package.json yarn.lock .yarnrc.yml ./
COPY --chown=pptruser:pptruser server/package.json server/package.json
COPY --chown=pptruser:pptruser ui/package.json ui/package.json
RUN yarn install --immutable

COPY --chown=pptruser:pptruser . .
RUN yarn build

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=6 \
  CMD node -e "fetch('http://127.0.0.1:8000/healthz').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["yarn", "start"]
