# RecipeBook-Backend-API

# Deployment Guide

# 1. Instal Dependencies
```
npm i
```

# 2. Set Environment Variables


RECIPE_API_JWT_PRIVATE_KEY <br />
RECIPE_API_DB <br />
RECIPE_API_PORT <br />
RECIPE_API_REQUIRES_AUTH <br />
RECIPE_API_MAX_USERS <br />
RECIPE_API_TOKEN_EXPIRY <br />
RECIPE_API_EMAIL <br />
RECIPE_API_MAIL_PASSWORD <br />
RECIPE_API_CLIENT_URL <br />


### Example (For windows)
```
set RECIPE_API_JWT_PRIVATE_KEY=abc12345
set RECIPE_API_DB=mongodb://localhost/recipebook
set RECIPE_API_PORT=5000
set RECIPE_API_REQUIRES_AUTH=true
set RECIPE_API_MAX_USERS=1000
```

# 3. Run Test

```
npm run test
```

# 4. Run (in development mode)
```
npm run dev
```

# 5. Run (in development mode)
```
npm run start
``