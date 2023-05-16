const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema, model } = require("mongoose");
// const thirdpartyProviderSchema = new Schema({
//   provider_name: {
//     type: String,
//     default: null,
//   },
//   provider_id: {
//     type: String,
//     default: null,
//   },
//   provider_data: {
//     type: {},
//     default: null,
//   },
// });

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    email_is_verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    referal_code: {
      type: String,
      default: function () {
        let hash = 0;
        for (let i = 0; i < this.email.length; i++) {
          hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
        }
        let res = (hash & 0x00fffff).toString(16).toUpperCase();
        return "00000".substring(0, 6 - res.length) + res;
      },
      reffred_by: {
        type: String,
        default: null,
      },

      date: {
        type: Date,
        default: Date.now(),
      },
    },
  },
  { strict: false }
);

userSchema.methods.comparePassword = function (candiditePassword) {
  return bcrypt.compareSync(candiditePassword, this.password);
};
userSchema.methods.createJwt = function () {
  const token = jwt.sign({ userId: this._id, email: this.email }, "mysecret");
  return token;
};

module.exports = model("user", userSchema);
// userSchema.pre("save", async function () {
//   const hash = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, hash);
// });
