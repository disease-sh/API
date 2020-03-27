# Setup
## Redis
1. Download redis from https://redis.io/topics/quickstart
2. Start redis server using `redis-server`

## Project
1. Fork and clone git repository
2. In root project folder, make a new file called config.json
3. Copy contents for config.example.json to new config.json file
4. Replace password field with `""` and port field to whatever localhost port you want.
5. From root of project, run `node server.js`
6. In your browser, go to `localhost:{port}` to test your local changes

# Run with docker-compose.
1. Fork and clone git repository
2. In root project folder, make a new file called config.json
3. Copy contents for config.example.json to new config.json file
4. Replace password field with `"yourpassword"` and port field same within `docker-compose.yml`.
5. Run command `docker-compose up --build -d`.