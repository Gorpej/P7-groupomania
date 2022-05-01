# Groupomania

# Back-end
## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
nodemon server
```
## dotenv
```
PORT = select port

connect to 

const port = normalizePort(process.env.PORT || '3000');
```

```
DATABASE_HOST = select host
DATABASE_USER = select database user
DATABASE_NAME = select database name
DATABASE_PASS = select database password

connect to 

const db = mysql.createConnection({
  
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
 
});
```

```
TOKEN_SECRET = select secret key for token

connect to 

 const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
```

# Front-end
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

