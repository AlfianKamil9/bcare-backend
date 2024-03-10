# Capstone Project Repository
 This repository was created for documentation and a collaborative platform in the Bangkit Capstone Project 2023 Batch 2, this is a back-end repository that uses Node.js and Google CLoud Platform.
## Dependencies Project (origin branch)
- Express Javascript Framework
- JsonWebToken
- Dotenv
- Bcrypt
- Mysql2
- Nodemon
- Sequelize
- Swagger-ui-express
- Validator
## Machine Learning Models
#### Model For Quiz
   
   ```ModelQuiz
   https://storage.googleapis.com/models-mechine-learning-ch2-ps134/model_model2/model.json
   ```
#### Model For Image

   ```ModelImage
   https://storage.googleapis.com/models-mechine-learning-cnn/cnn_1/model.json
   ```
#### Try the project
1. Clone Deployment Models
   
   ```Clone
   git clone -b deployment-ml-cc https://github.com/AlfianKamil9/capstone-project.git
   ```
2. Install dependencies
   
   ```Bash
   npm install
   ```
3. Run Script
   
   ```Script
   npm run dev
   ```
## Instalation 
If you want to try this project,
1. Clone this project
   
   ```Clone
   git clone -b main https://github.com/AlfianKamil9/capstone-project.git
   ````
2. Install dependencies

   ```Bash
   npm install
   ```
3. Add folder `config/config.json`

   ```Bashline
   {
    "development": {
      "username": "root",
      "password": null,
      "database": "Your-Db-Name",
      "host": "localhost",
      "dialect": "mysql"
      }
   }
   ```
4. Add file `.env`

   ```Bashenv
   # APP
   APP_NAME=CAPSTONE_PROJECT
   APP_URL=http://localhost
   APP_PORT=3000
   APP_ENV=local
   
   # SECRET TOKEN
   TOKEN=YOUR-SECRET-TOKEN
   
   #SECRET KEY ACCESS ML LOAD MODEL
   ML_KEY=capstone-project-machine-learning
   ML_URL=http://localhost:5000
   
   #KONFIGURASI GOOGLE CLOUD BUCKET
   PROJECT_ID=YOUR-PROJECT-ID
   BUCKET_NAME=YOUR-BUCKET-NAME
   
   # DATABASE
   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=capstone_project
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Generate Database
   
   ```Bashdb
   # Generate Table from Model & Migration
   npx sequelize-cli db:migrate
 
   # Generate data seeders
   npx sequelize-cli db:seed:all
 
   # Delete Table
   npx sequelize-cli db:migrate:undo
 
   # Delete Table
   npx sequelize-cli db:seed:undo:all
   ```

6. Add file `serviceaccountkey.json` from your service account

   ```bash
   #Example - Please Change with your serviceaccountkey

   {
     "type": "service_account",
     "project_id": "YOUR-PROJECT-ID",
     "private_key_id": "YOUR-PRIVATE-KEY-ID",
     "private_key": "-----BEGIN PRIVATE KEY-----FINISH PRIVATE KEY-----"
     "client_email": "---CLIENT-EMAIL---",
     "client_id": "------CLIENT-ID------",
     "auth_uri": "------AUTH-URI------",
     "token_uri": "-----TOKEN-URI-----",
     "auth_provider_x509_cert_url": "-----AUTH-PROVIDER-----",
     "client_x509_cert_url": "------CLIENT-CERT-URL------",
     "universe_domain": "googleapis.com"
   }
   
   ```
7. Run Project

   ```Bashrun
   npm run start
   ```

## API Dokumentasi
Dokumentasi Sweager API
```Bashlink
http://localhost:3000/api-docs
```
Table of API
| Method | Routes | Token | Description |
| ---    |  ---   | ---  | ---         |
| `POST` | /api/v1/login | no | email: required;  password: required; |
| `POST` | /api/v1/register | no | email: required; name: required; familyEmail: required; password: required; confPassword: required,same; |
| `POST` | /api/v1/submit-quiz | required | a1: required; a2: required; a3: required; a4: required; a5: required; a6: required; a7: required; a8: required; a9: required; a10: required;|
| `GET`  | /api/v1/artikel | no | |
| `GET`  | /api/v1/artikel/{id} | no | |
| `GET` | /api/v1/questions | required | |
| `DELETE` | /api/v1/logout | required | |
## Deploy to APP Engine 
## Deploy to Vertex AI
