# Flux Project

Welcome to the Flux project repository. Flux is a web application designed for managing shared expenses among friends. This repository contains both the client-side and server-side code necessary to run the application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Setup Environment Variables](#setup-environment-variables)
  - [Install Dependencies](#install-dependencies)
  - [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (running locally or a MongoDB Atlas account)

## Getting Started

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/codeitkrishna/Flux.git
cd Flux
```

### Install dependencies:

Install server dependencies:

```bash
cd server
npm install

```
Install client dependencies:

```bash
cd ../client
npm install

```
### Setup process.env file
Navigate to the `server` directory, check for `.env` file. In not, create one. It should look like this -

```bash
PORT=3000
SECRET_TOKEN=Flux_Token
MONGODB_URI= "mongodb+srv://krishna-gupta:Krishna%239175@users.7jrz8lq.mongodb.net/?retryWrites=true&w=majority&appName=Users"
```
Or you can configure mongodb connection based on your account. Make sure to adjust changes in connection.js file accordingly.

### Run the project:

```bash
cd ../server
node server.js

cd client
npm start

```

## Contributing

- Fork the repository.
- Create your feature branch (git checkout -b feature/AmazingFeature).
- Commit your changes (git commit -m 'Add some AmazingFeature').
- Push to the branch (git push origin feature/AmazingFeature).
- Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Krishna - mailittokrishnagupta@gmail.com

Project Link: https://github.com/codeitkrishna/Flux