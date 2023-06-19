const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  email: String,
  preferences: [String]
})

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;