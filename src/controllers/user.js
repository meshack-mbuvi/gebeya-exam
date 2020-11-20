import { UserSchema } from '../database/Models';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

export class UserController {
  /**
   * This method inserts a new user into the database.
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} user A new user object
   */
  static async CreateUser(request, response) {
    const {
      body: { name, email, password },
    } = request;

    if (!name || !email || !password) {
      return response.status(400).send({
        message: 'name, email and password are required and must be not empty.',
      });
    }

    try {
      const userExits = await UserSchema.find({ email: email });
      if (userExits) {
        return response.status(409).send({
          message: 'User already exists.',
        });
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      let user = new UserSchema({ name, email, password: passwordHash });

      user = await user.save();
      delete user.password;

      const token =
        'Bearer ' + (await jwt.sign({ id: user.id }, process.env.SECRET_KEY));

      return response.status(201).send({
        user,
        token,
        message:
          'User has been created successfully. An authorization token is attached.',
      });
    } catch (error) {
      console.log({ error });
      return response.status(500).send({
        message: 'An error occurred while saving you account details.',
      });
    }
  }

  /**
   * This method inserts a new user into the database.
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} user A new user object
   */
  static async Login(request, response) {
    const {
      body: { email, password },
    } = request;

    if (!email || !password) {
      return response.status(400).send({
        message: 'email and password are required and must be not empty.',
      });
    }

    try {
      // retrieve user details and generate a token if the match
      const user = await UserSchema.findOne({ email: email });
      if (!user) {
        return response.status(404).send({
          message:
            'A user with given details does not exist with our database.',
        });
      }

      // compare passwords
      if (bcrypt.compareSync(password, user.password)) {
        const token =
          'Bearer ' + (await jwt.sign({ id: user.id }, process.env.SECRET_KEY));
        delete user.password;

        return response.status(200).send({
          user,
          token,
          message: 'User logged in successfully.',
        });
      } else {
        return response.status(401).send({
          message: 'Invalid credentials used.',
        });
      }
    } catch (error) {
      console.log({ error });
      return response.status(200).send({
        message: 'An error occurred while logging in.',
      });
    }
  }
}
