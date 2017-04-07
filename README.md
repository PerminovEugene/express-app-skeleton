This is skeleton of backend application using: express, mongoose, passport.
 
For install application locally:
 1. In directory app/configs copy all files (but without '.example' in file name)
    and fill them. Example: .env.example => .env
    For fill twitter.json you need create your application on twitter.com
    and generate tokens.
 
 2. Run docker:
    ...
    docker-compose up -d
    ...

 3. Set your git pre-commit file. 
    You can find instructions in pre-commit.example file.
    Also you must install eslint and eslint-config-google globally
    ... 
    npm i eslint --global
    npm i eslint-config-google --global
    ...
    
    