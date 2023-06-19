const Subscription = require("../models/subscriptions");

const SubscriptionController = {
  Index: (req, res) =>{
    Subscription.find({preferences: req.params.preference}, (err, subs) => {
      if (err) throw err;
      res.status(200).json({subs: subs});

    }
    )
  },
  Create: (req, res) => {
    console.log("REQQQQ",req.body);
    const { email, preferences } = req.body;

    // Cria uma nova instância de Subscription com os dados
    const newSub = new Subscription({ email, preferences });

    // Salva a instância
    newSub.save((err, sub) => {
        if (err) throw err;
        res.status(200).json({ sub: sub });
    });
}

}