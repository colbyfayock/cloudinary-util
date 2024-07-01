<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/62209650/196528621-b68e9e10-7e55-4c7d-9177-904cadbb4296.png" align="center" height=50>
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/62209650/196528761-a815025a-271a-4d8e-ac7e-cea833728bf9.png" align="center" height=50>
  <img alt="Cloudinary" src="https://user-images.githubusercontent.com/62209650/196528761-a815025a-271a-4d8e-ac7e-cea833728bf9.png" align="center" height=30>
</picture>

######

<a href="https://www.npmjs.com/package/@cloudinary-util/url-loader"><img alt="npm" src="https://img.shields.io/npm/v/@cloudinary-util/url-loader?style=flat-square"></a> <a href="https://github.com/colbyfayock/cloudinary-util/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/colbyfayock/cloudinary-util?label=License&style=flat-square"></a>

# Cloudinary URL Loader

A function to construct a Cloudinary URL based on a set of options.

The loader works by loading a list of "plugins" which provide option-based configuration for features like optimization, cropping, and background removal.

<a href="#-getting-started">Getting Started</a>

**This is a community library supported by the Cloudinary Developer Experience team.**

## 🚀 Getting Started

_The minimum node version officially supported is version 18._

- Install Cloudinary URL Loader:

```
npm install @cloudinary-util/url-loader
```

- Import the dependency:

```
import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
```

- Create a Cloudinary URL:

```
const url = constructCloudinaryUrl({
  options: {
    src: 'my-public-id',
    width: 800,
    height: 600
  },
  config: {
    cloud: {
      cloudName: 'my-cloud'
    }
  }
});
```
