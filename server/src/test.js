const stripe = require("stripe")(
  "sk_test_51MWeyiDgialm3M1iS03RS8jhJZWnmpY9RMjQ1U23MkCzC9Riptrhky19EG7izY0FDmGJzZChovEMVGGfGlMOKYwo00yfhHRoKG"
);

const paymentMethod = await stripe.paymentMethods.create({
  type: "card",
  card: {
    number: "4242424242424242",
    exp_month: 8,
    exp_year: 2023,
    cvc: "314",
  },
});


const sendMoney = async () => {
 
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
        payment_method:paymentMethod.id ,
        confirm: true

      });
  
  
  console.log(paymentIntent);
};

// sendMoney()
