# Gebeya talentmarketplace exam

This is an api for nodejs app as requested by Gebeya team.
The API enlists ecommerce items and handles purchase details

## Features

The API has the following endpoints:

- Endpoint to signup and login
- Endpoint to create, update, view and delete a product item.
- Endpoint to add items to cart, view and delete a product item from cart

## Getting started

To run this api locally, do the following.

- Clone the repository and change directory to the repository directory.
- Create .env file and populate it as shown by the .env-sample
- Build docker image by executing `docker-compose build` with the necessary permissions.
- Start the image via `docker-compose up`

The API can be accessed via localhost:5000/api now.

Use the documentation guide for more information on how to test the endpoints.
The API documentation can be found at `/api-docs`
Note: You must signup first before accessing the product endpoints.

## Technologies

The API is built using:

- MongoDB- for easier prototyping.
- ExpressJs
