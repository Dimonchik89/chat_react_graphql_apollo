const { PubSub } = require("graphql-subscriptions");
const { sequelize } = require("../db/models");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { GraphQLError } = require('graphql');

require('dotenv').config()
const messages = [];

const pubsub = new PubSub();

const createToken = ({email, name, id}) => {
  return jwt.sign(
    { email, name, id }, 
    process.env.TOKEN_KEY, 
    { expiresIn: "24h"}
  )
}

module.exports = {
  Query: {
    messages: async (parent, args, context) => {
      console.log("context", context)
      const messages = await sequelize.models.Messages.findAll()
      return messages
    },
    auth: (parent, args,context) => {
      const token = context.token;
      if(token) {
        const user = jwt.verify(token, "123456")
        console.log("user", user);
        const newToken = createToken({email: user.email, name: user.name, id: user.id})
        return { token: newToken }
      } else {
        throw new GraphQLError("Token invalidate", {
          extensions: "BAD_USER_INPUT"
        })
      }
    }
  },
  Mutation: {
    createMessage: async (parent, { messageInput }) => {
      const { text, userName, userId } = messageInput;
      const newMessage = await sequelize.models.Messages.create({text, userName, userId})

      pubsub.publish("MESSAGE_CREATE", {
        messageCreated: newMessage,
      });

      return newMessage;
    },
    createUser: async (parent, { userRegisterInput }) => {
      const { email, name, password } = userRegisterInput;

      if(!email && !name && !password) {
        throw new GraphQLError("fields are not filled",{
          extensions: "BAD_USER_INPUT"
        })
      }
      const oldUser = await sequelize.models.User.findOne({ where: { email }})
      if(oldUser) {
        throw new GraphQLError('User already exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      
      const encryptedPassword = await bcrypt.hash(password, 10)

      const user = await sequelize.models.User.create({ email, name, password: encryptedPassword})
      const token = createToken({ email, name, id: user.id })
      return { token }
    },
    loginUser: async (parent, { userLoginInput }) => {
      const { email, password } = userLoginInput;

      if(!email && !password) {
        throw new GraphQLError("fields are not filled", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      const user = await sequelize.models.User.findOne({ where: { email }})

      if(user && (await bcrypt.compare(password, user.password))) {
        const token = createToken({email: user.email, name: user.name, id: user.id})
        return { token }
      }
      if(user && !(await bcrypt.compare(password, user.password))) {
        throw new GraphQLError("Invalid Credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      throw new GraphQLError("User not found", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR"
        }
      })
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator("MESSAGE_CREATE"),
    },
  },
};
