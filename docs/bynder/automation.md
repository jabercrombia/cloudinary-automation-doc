---
sidebar_position: 6
---

# Automation!

1. Install Cloudinary SDK and dependencies
```bash
npm install cloudinary dotenv
```

2. Create `.env` file
```ini
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Upload script (upload-images.js)

```bash
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folderPath = './images'; // Your local image folder

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
      cloudinary.uploader.upload(filePath, { folder: 'my_uploaded_images' })
        .then(result => console.log(`Uploaded ${file}: ${result.secure_url}`))
        .catch(error => console.error(`Error uploading ${file}:`, error));
    }
  });
});
```

4. Run the script
```bash
node upload-images.js
```

## Daily job

### Outstanding Questions
- Are the images same size ratio or dimensions?
- Do you have an AWS account or should this be run locally?