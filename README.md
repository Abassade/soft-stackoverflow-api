## Softcom Backend Technical Challenge API (Stackoverflow Clone)

### description
This project aims to clone simple features of stackoverflow

### Note
If time permits, this API can still be further improved and many other useful endpoints can be added.


## Installation

Ensure you have the below required softwares installed before you clone this repo

- **Node** version >= 12.0.0
- **npm** version >= 6.13.4
- **mongodb**
---

## Configuration
After a successful installation of the above stated softwares, copy the below command to your terminal to clone the project 

```bash
git clone sosos.git
```
After cloning the project, run the command below to install all the required node modules.

```bash
npm install
```
---
## Author
**(Abass Makinde)** - <abassademak@gmail.com>

---

## Operating instruction
- Dont't forget to create a `.env` file, update it with the content of `sample.env` file in the project directory.
- To start this software, run the first command below to get the code running at development level

```bash
npm start
```

---
### User Routes (They are all HTTP)

Name                                         | Endpoint
------------------------------------------- | -------------------------------------------
(**POST**) Sign up request                             | /v1/user/signup
(**POST**) Sign in request                             | /v1/user/signin
(**GET**) Search user status                             | /v1/user/text/search?keywords={abass}

**Sign up request**

A new user can sign up to become a member

Sample subscription call - ```localhost:8080/v1/user/signup```

***sample request***

```json
{
	"email": "softcomng@gmail.com",
	"password": "softcom",
	"cPassword": "softcom",
	"firstname": "soft",
	"lastname": "com"
}
```

***sample response***

```json
{
    "error": false,
    "code": 201,
    "data": "softcomng@gmail.com",
    "message": "successfully registered a new user"
}
```


**Sign in request**

User can sign in to have access to some authenticated endpoints
sample call - ```localhost:8080/v1/user/signin```

***sample request***

```json
{
	"email": "softcomng@gmail.com",
	"password": "softcom"
}
```

***sample response***

```json
{
    "error": false,
    "code": 200,
    "data": "5eb67dbea5b8e0ea338bc24e",
    "message": "user successfully logged in"
}
```

**Search for user**

Any keywords can be searched in user collection, any collection that contains the kwywords serached will be returned, if not found, an empty array will be a response alonside some message.

sample call - ```localhost:8080/v1/user/text/search?keywords=soft```

***sample response***

```json
{
    "error": false,
    "code": 200,
    "data": [
        {
            "_id": "5eb67dbea5b8e0ea338bc24e",
            "email": "softcomng@gmail.com",
            "firstname": "soft",
            "lastname": "com",
            "createdAt": "2020-05-09T09:54:06.434Z",
            "updatedAt": "2020-05-09T09:54:06.434Z"
        },
        {
            "_id": "5eb67d35b1102eea01e2f98d",
            "email": "softcom@gmail.com",
            "firstname": "soft",
            "lastname": "com",
            "createdAt": "2020-05-09T09:51:49.849Z",
            "updatedAt": "2020-05-09T09:51:49.849Z"
        }
    ],
    "message": "fetched successfully"
}
```
---

#### Question Endpoint
With this endpoint, question can be asked, viewed and even searched

Name                                         | Endpoint
------------------------------------------- | -------------------------------------------
(**POST**) Ask question request                             | /v1/question/
(**GET**) View questions request                             | /v1/question/
(**GET**) Search for question request                             | /v1/question/search?keywords={coding}
**Subscription request**

##### Ask Question endpoint
A user can ask question

sample call - ```localhost:8080/v1/question/```

***sample request***

```json
{
	"question": "How can i make money with coding API"
}
```

***sample response***

```json
{
    "error": false,
    "code": 201,
    "data": "How can i make money with coding API",
    "message": "question added successfully"
}
```


**View questions request**

All questions can be viewed without being a user (no auth)

sample unsubscription call - ```localhost:8080/v1/question/```

***sample response***

```json
{
    "error": false,
    "code": 200,
    "data": [
        {
            "votes": 1,
            "_id": "5eb29434d7464cc5268e2b3a",
            "question": "why is code so sweet?",
            "user": "5eb28aec2f874ec4279a92ad"
        },
        {
            "votes": 3,
            "_id": "5eb2c99a68d65cc87aff5d8e",
            "question": "Coding is somehow?",
            "user": "5eb28aec2f874ec4279a92ad"
        }
    ],
    "message": "questions fetched successfully"
}
```

**Search question**

Questions can be searched without auth

sample call - ```localhost:8080/v1/question/search?keywords=coding```

***sample response***

```json
{
    "error": false,
    "code": 200,
    "data": [
        {
            "votes": 3,
            "_id": "5eb2c99a68d65cc87aff5d8e",
            "question": "Coding is somehow?",
            "user": {
                "_id": "5eb28aec2f874ec4279a92ad",
                "email": "dada@gmail.com",
                "firstname": "abass",
                "lastname": "makinde"
            },
            "createdAt": "2020-05-06T14:28:42.187Z",
            "updatedAt": "2020-05-06T21:06:21.698Z"
        },
        {
            "votes": 1,
            "_id": "5eb29434d7464cc5268e2b3a",
            "question": "why is code so sweet?",
            "user": {
                "_id": "5eb28aec2f874ec4279a92ad",
                "email": "dada@gmail.com",
                "firstname": "abass",
                "lastname": "makinde"
            },
            "createdAt": "2020-05-06T10:40:52.636Z",
            "updatedAt": "2020-05-06T14:26:53.712Z"
        }
    ],
    "message": "fetched successfully"
}
```

---

#### Answer Endpoints

Name                                         | Endpoint
------------------------------------------- | -------------------------------------------
(**POST**) Answer a question                             | /v1/answer
(**GET**) View all answers                             | /v1/answer
(**GET**) Serach answers by keywords                         |  /v1/answer/search?keywords={yes}


**Answer a question**

This endpoint allows users to answer to questions ont the platform. (Auth required)


sample call - ```localhost:8080/v1/answer```

***sample request***

```json
{
	"question": "5eb29434d7464cc5268e2b3a",
	"answer": "smiles! yes maybe"
}
```

***sample response***

```json
{
    "error": false,
    "code": 201,
    "message": "Answer added successfully"
}
```


**View all answers**

partner can initiate a request

sample call - ```localhost:8080/v1/answer```

***sample response***

```json
{
    "error": false,
    "code": 200,
    "data": [
        {
            "_id": "5eb3d69f9373a4cf544ecf5f",
            "question": {
                "votes": 1,
                "_id": "5eb29434d7464cc5268e2b3a",
                "question": "why is code so sweet?"
            },
            "answer": "smiles! yes maybe",
            "user": {
                "_id": "5eb2cc4e724013c8bbe4132f",
                "email": "aba@gmail.com",
                "firstname": "makinde",
                "lastname": "ade"
            }
        },
        {
            "_id": "5eb3d6a39373a4cf544ecf60",
            "question": {
                "votes": 1,
                "_id": "5eb29434d7464cc5268e2b3a",
                "question": "why is code so sweet?"
            },
            "answer": "smiles! yes maybe",
            "user": {
                "_id": "5eb2cc4e724013c8bbe4132f",
                "email": "aba@gmail.com",
                "firstname": "makinde",
                "lastname": "ade"
            }
        }
    ],
    "message": "Answers fetched successfully"
}
```

**Search answers by keywords**

Keywords can be input to search for answer collection. It is a full text search
sample api call ```localhost:8080/v1/services/stat```

***sample response***

```json
{
    "error": false,
    "code": 200,
    "data": [
        {
            "_id": "5eb6b7159396e7eb9dffb3db",
            "question": {
                "_id": "5eb29434d7464cc5268e2b3a",
                "question": "why is code so sweet?"
            },
            "answer": "smiles! yes maybe",
            "user": {
                "_id": "5eb67dbea5b8e0ea338bc24e",
                "email": "softcomng@gmail.com",
                "firstname": "soft",
                "lastname": "com"
            },
            "createdAt": "2020-05-09T13:58:45.875Z",
            "updatedAt": "2020-05-09T13:58:45.875Z"
        },
        {
            "_id": "5eb6b6e49396e7eb9dffb3da",
            "question": {
                "_id": "5eb29434d7464cc5268e2b3a",
                "question": "why is code so sweet?"
            },
            "answer": "smiles! yes maybe",
            "user": {
                "_id": "5eb67dbea5b8e0ea338bc24e",
                "email": "softcomng@gmail.com",
                "firstname": "soft",
                "lastname": "com"
            },
            "createdAt": "2020-05-09T13:57:56.620Z",
            "updatedAt": "2020-05-09T13:57:56.620Z"
        }
    ],
    "message": "fetched successfully"
}
```

---

#### Vote Endpoints

Name                                         | Endpoint
------------------------------------------- | -------------------------------------------
(**GET**) Upvote a question                             | /v1/question/vote?questionId={id}&vote={up}
(**GET**) Downvote a question                             | /v1/question/vote?questionId={id}&vote={down}


**Upvote a question**

With this endpoint, you can upvote a question (Auth required)


sample call - ```localhost:8080/v1/question/vote?questionId=5eb2c99a68d65cc87aff5d8e&vote=up```

***sample response***

```json
{
    "error": false,
    "code": 200,
    "message": "your (up) vote has been added"
}
```


**Downvote a question**

With this endpoint, you can downvote a question (Auth required)

sample call - ```localhost:8080/v1/question/vote?questionId=5eb2c99a68d65cc87aff5d8e&vote=down```

***sample response***

```json
{
    "error": false,
    "code": 200,
    "message": "your (down) vote has been added"
}
```

### More Info
For more description of this API, please contact the author of this code with the detail provided above