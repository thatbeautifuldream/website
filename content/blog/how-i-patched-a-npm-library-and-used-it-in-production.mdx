---
title: "How I Patched a NPM Library and Used It in Production"
datePublished: Tue Apr 01 2025 15:35:34 GMT+0000 (Coordinated Universal Time)
cuid: cm8yntobk000309jsg75vevgg
slug: how-i-patched-a-npm-library-and-used-it-in-production
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743521600952/46777df7-3ded-4db2-9f02-1e7f9dc83935.png
tags: opensource, npm, fork, npm-packages

---

## The Problem: A PR That Wasn't Merged

In our project, we were using `react-arborist` for managing a tree view component. However, we needed a feature that wasn’t available in the official package. After searching, I found an open pull request (PR) that added exactly what I needed, but it hadn’t been merged yet.

Instead of waiting indefinitely, I decided to fork the repository, apply the PR myself, and use the patched version in our project. Here’s how I did it step by step.

---

## Step 1: Forking the Repository and Checking Out the PR Branch

The first step was to fork the original repository on GitHub and check out the branch from the existing PR.

```bash
# Clone the forked repo
git clone https://github.com/yourusername/react-arborist.git
cd react-arborist

# Fetch the PR branch (assuming the PR branch is named `feature-branch`)
git fetch origin pull/238/head:feature-branch

# Switch to the PR branch
git checkout feature-branch
```

This gave me a local copy of the unmerged PR to work with.

---

## Step 2: Testing the Feature Locally with `npm link`

Before using it in my main project, I needed to test the feature locally. To do this, I used `npm link`:

1. **Build the package (if necessary)**
    
    Many npm packages require a build step before they can be used. I checked the `package.json` for build scripts and ran:
    
    ```bash
    npm install
    npm run build  # If there's a build script
    ```
    
2. **Create a local npm link**
    
    In the root of `react-arborist`, I ran:
    
    ```bash
    npm link
    ```
    
    This made the package globally available on my system.
    
3. **Use the linked package in my main project**
    
    In my actual project directory, I ran:
    
    ```bash
    npm link react-arborist
    ```
    
    Now, my project was using my locally modified version of `react-arborist` instead of the one from npm.
    
4. **Test the feature**
    
    After linking, I tested the changes in my project. Once I confirmed that everything was working, I moved to productionizing the package.
    

---

## Step 3: Creating a Tarball (`.tgz`) and Hosting It for Free

To use the package in production, I needed to package it and host it somewhere accessible. Since I wanted a CDN-backed solution, I used GitHub and JSDelivr.

1. **Create an npm tarball**
    
    ```bash
    npm pack
    ```
    
    This generated a file like `react-arborist-1.0.0.tgz`.
    
2. **Upload the Tarball to GitHub**
    
    I created a new GitHub repository (or used an existing one) and uploaded the tarball as a release asset or a raw file.
    
3. **Use JSDelivr to Serve It from a CDN**
    
    Once the `.tgz` file was uploaded to GitHub, I could serve it using JSDelivr’s GitHub CDN. The URL follows this pattern:
    
    ```bash
    https://cdn.jsdelivr.net/gh/yourusername/yourrepo@main/react-arborist-1.0.0.tgz
    ```
    
    To find the exact URL for your file, navigate to the file on GitHub and copy its raw URL. Then, replace [`raw.githubusercontent.com`](http://raw.githubusercontent.com) with [`cdn.jsdelivr.net`](http://cdn.jsdelivr.net).
    

---

## Step 4: Installing the Custom Package in My Project

Now that the package was available via a CDN, I could install it in my project by updating `package.json`:

```json
"dependencies": {
  "react-arborist": "https://cdn.jsdelivr.net/gh/yourusername/yourrepo@main/react-arborist-1.0.0.tgz"
}
```

Then, I ran:

```bash
npm install
```

Now my project was using the patched version of `react-arborist`, served from a free CDN!

---

## Conclusion

This approach allowed me to:

* Use an unmerged PR in production without waiting for the official package to update.
    
* Host a patched npm package for free using GitHub and JSDelivr.
    
* Seamlessly integrate the package into my project.
    

If you ever find yourself needing a feature that’s stuck in an unmerged PR, you can follow this process to fork, patch, and use it in your own projects!