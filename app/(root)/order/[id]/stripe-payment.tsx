const StripePayment = ({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
}) => {

    console.log( priceInCents,
  orderId,
  clientSecret)


  
  return <>Stripe Form</>;
};

export default StripePayment;
