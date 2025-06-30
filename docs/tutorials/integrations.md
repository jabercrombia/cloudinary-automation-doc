---
title: Integrations
sidebar_position: 2
---

# Integrations

## Bynder

Bynder offers SDKs in multiple languages to streamline integration with their APIs. You can find the full list of SDKs here:
[Bynder Developer SDKs](https://developers.bynder.com/sdks)

These SDKs abstract away the need to manually handle authentication, API requests, and endpoint construction.

NPM Package: [https://www.npmjs.com/package/@bynder/bynder-js-sdk](https://www.npmjs.com/package/@bynder/bynder-js-sdk)

```
npm i @bynder/bynder-js-sdk
```

Example Usage:

```js
import Bynder from '@bynder/bynder-js-sdk';

const bynder = new Bynder({
  domain: 'https://your-company.bynder.com',
  permanentToken: 'your-permanent-token',
});

// Example: Get media assets
bynder.media
  .list({
    type: 'image',
    limit: 10,
  })
  .then((mediaList) => {
    console.log('Media assets:', mediaList);
  })
  .catch((err) => {
    console.error('Error fetching assets:', err);
  });

```

## Salsify

Salsify provides a robust set of APIs to retrieve product information, including images, attributes, and metadata. You can refer to their [Developer Portal](https://developers.salsify.com/) for full API documentation.

By utilizing Salsify's Product API you can retrieve product images and send those images to Cloudinary.
```
npx api install "@salsify/v1.0#h2viily4hwlww"
```

Example:

```js
const url = 'https://app.salsify.com/api/v1/orgs/org_id/products/%7Bsalsify:id%7D';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', Authorization: 'Bearer {api_key}'}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
```

## Cloudinary Integration Solution

I wrote an API endpoint in Next.js that can be used to send images to Cloudinary found [here](https://github.com/jabercrombia/cloudinary-project/blob/main/app/api/hourly-upload/route.ts).

I have this repo deployed to: [https://cloudinary-project.vercel.app/api/hourly-upload/](https://cloudinary-project.vercel.app/api/hourly-upload/).  Within this repo is an images directory that takes all images in that directory and uploads it to Cloudinary. Everytime this repo is accessed the images in the image directory in the repo are uploaded to cloudinary. 

### Deployment

#### Scheduled Automation via Vercel
Vercel supports Scheduled Functions, which makes it easy to automate image uploads.

I've configured this API route to be callable via cron jobs using Vercel's native scheduler. This enables running the upload script:

- Hourly
- Daily
- Every 15 minutes — or any custom cron expression

This makes it ideal for workflows like:

- Migrating assets from one platform to Cloudinary in chunks
- Automating uploads from a shared drive or mounted cloud file system (like LucidLink)