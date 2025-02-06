# Canva App Image Horizontal Flip Mini Program

## Introduction

This project is a mini program developed based on the Canva App, designed to provide users with the functionality to horizontally flip images. Users can easily select an image and perform a horizontal flip to meet various design needs.
## Try it out
[You can try it out here](https://www.canva.com/design/DAGeSRF8IBQ/xZC7AW-Cmtirp5nPDCvxyA/edit?ui=eyJFIjp7IkE_IjoiTiIsIlMiOiJBQUdlTnlYTG9nbyIsIlQiOjF9fQ)
## Features
- **Image Horizontal Flip**: Users can select an image and perform a horizontal flip operation.
- **Real-time Preview**: The flipped effect can be previewed in real-time, allowing users to make adjustments as needed.

## Installation and Setup

## Requirements

- Node.js `v18` or `v20.10.0`
- npm `v9` or `v10`

**Note:** To ensure you're running the correct version of Node.js, we recommend using a version manager such as [nvm](https://github.com/nvm-sh/nvm#intro). The [.nvmrc](https://chat.deepseek.com/.nvmrc) file in the root directory of this repository will ensure the correct version is used once you run `nvm install`.

## Quick Start

```
git clone https://github.com/JefferyHcool/demo_for_canva.git
cd demo_for_canva
npm install
```

## Using the Boilerplate

### Step 1: Start the Local Development Server

The `src` directory contains the boilerplate of an app.

To start the boilerplate's development server, run the following command:

```
npm start
```

The server will be available at [http://localhost:8080](http://localhost:8080/).

The app's source code is located in the `src/app.tsx` file.

### Step 2: Preview the App

The local development server only exposes a JavaScript bundle, so you cannot preview the app by visiting [http://localhost:8080](http://localhost:8080/). You can only preview the app via the Canva editor.

To preview the app:

1. Create an app via the [Developer Portal](https://www.canva.com/developers/apps).
2. Select **App source > Development URL**.
3. In the **Development URL** field, enter the URL of the development server.
4. Click **Preview**. This will open the Canva editor (and the app) in a new tab.
5. Click **Open**. (This screen only appears when using an app for the first time.)

The app will appear in the side panel.

### (Optional) Step 3: Enable Hot Module Replacement

By default, every time you make a change to the app, you must reload the entire app to see the results of those changes. If you enable [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR), changes will be reflected without a full reload, significantly speeding up the development process.

**Note:** HMR does **not** work while running the development server in a Docker container.

To enable HMR:

1. Navigate to your app via the [Your apps](https://www.canva.com/developers/apps) page.

2. Select **Configure your app**.

3. Copy the value from the **App origin** field. This value is unique to each app and cannot be customized.

4. In the starter kit's directory, open the `.env` file.

5. Set the `CANVA_APP_ORIGIN` environment variable to the value copied from the **App origin** field:

   ```
   CANVA_APP_ORIGIN=# YOUR APP ORIGIN GOES HERE 
   ```

6. Set the `CANVA_HMR_ENABLED` environment variable to `true`:

   ```
   CANVA_HMR_ENABLED=true
   ```

7. Restart the local development server.

8. Reload the app manually to ensure that HMR takes effect.

<details> <summary>Previewing Apps in Safari</summary>

By default, the development server is not HTTPS-enabled. This is convenient as there's no need for a security certificate, but it prevents apps from being previewed in Safari.

**Why Safari Requires the Development Server to be HTTPS-enabled?**

Canva itself is served via HTTPS, and most browsers prevent HTTPS pages from loading scripts via non-HTTPS connections. Chrome and Firefox make exceptions for local servers, such as `localhost`, but Safari does not. Therefore, if you're using Safari, the development server must be HTTPS-enabled.

To learn more, see [Loading mixed-content resources](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#loading_mixed-content_resources).

To preview apps in Safari:

```
1. Start the development server with HTTPS enabled:
```

```
# Run the main app
npm start --use-https

# Run an example
npm start <example-name> --use-https
```

```
2. Navigate to <https://localhost:8080>.
3. Bypass the invalid security certificate warning:
       1. Click **Show details**.
              2. Click **Visit website**.
4. In the Developer Portal, set the app's **Development URL** to <https://localhost:8080>.
```

You will need to bypass the invalid security certificate warning every time you start the local server. A similar warning will appear in other browsers (and will need to be bypassed) whenever HTTPS is enabled.

