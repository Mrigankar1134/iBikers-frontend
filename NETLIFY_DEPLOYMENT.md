# Deploying iBikers Frontend to Netlify

This guide provides step-by-step instructions for deploying the iBikers frontend to Netlify, configured to work with the Render backend.

## Prerequisites

1. A Netlify account (https://netlify.com)
2. Your Render backend URL (https://ibikers-backend.onrender.com)

## Deployment Steps

### Option 1: Deploy using the Netlify UI

1. **Build your frontend locally (optional)**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Netlify**
   - Log in to your Netlify account
   - Go to "Sites" and click "Add new site" > "Import an existing project"
   - Connect to your Git provider (GitHub, GitLab, etc.)
   - Select your repository

3. **Configure the build settings**
   - Owner: Your Netlify team
   - Branch to deploy: `main` (or your deployment branch)
   - Base directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

4. **Deploy the site**
   - Click "Deploy site"
   - Netlify will build and deploy your frontend application

### Option 2: Deploy using the Netlify CLI

1. **Install the Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Log in to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize your site**
   ```bash
   cd frontend
   netlify init
   ```
   - Follow the prompts to either create a new site or connect to an existing one

4. **Deploy your site**
   ```bash
   netlify deploy --prod
   ```

## Verifying the Deployment

1. Once deployed, Netlify will provide you with a URL for your site (e.g., `https://ibikers.netlify.app`)
2. Visit the URL to ensure your frontend is working correctly
3. Test the connection to your Render backend by attempting to log in or view bikes

## Troubleshooting

- **CORS Issues**: If you encounter CORS errors, ensure your Render backend is properly configured to accept requests from your Netlify domain
- **API Connection Issues**: Verify that the `renderApi.js` file contains the correct Render backend URL
- **Build Failures**: Check the Netlify build logs for any errors

## Custom Domain (Optional)

1. In your Netlify dashboard, go to "Site settings" > "Domain management"
2. Click "Add custom domain"
3. Follow the instructions to set up your custom domain with Netlify

## Environment Variables (If Needed)

If your frontend requires environment variables:

1. Go to your site's dashboard in Netlify
2. Navigate to "Site settings" > "Environment variables"
3. Add any required environment variables

## Continuous Deployment

Netlify automatically sets up continuous deployment from your connected Git repository. Any changes pushed to your deployment branch will trigger a new build and deployment.