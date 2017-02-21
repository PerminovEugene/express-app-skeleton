const Schema = require('mongoose').Schema;

module.exports = {
  getSchema: () => {
    return {
      email: {
        type: String,
      },
      password: {
        type: String
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      patronymic: {
        type: String
      },
      isActive: {
        type: Boolean,
        default: true
      },
      salt: {
        type: String
      },
      twitterProfile: {
        type: Schema.Types.ObjectId,
        ref: "twitter_profile",
        default: null,
        unique: false
      }
    }
  },
  getSchemaName: () => {
    return "account"
  }
};