import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import PaymentMethodForm from "./payment-method-form";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { getMyCart } from "@/lib/actions/cart.actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Select payment Method",
};

const PaymentMethod = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const cart = await getMyCart()

  if (!userId) throw new Error("User not Found");

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect('/cart')
  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </>
  );
};

export default PaymentMethod;
