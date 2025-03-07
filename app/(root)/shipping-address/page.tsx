import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
// import { ShippingAddress } from "@/types";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingAddressForm from "./shipping-address-form";
import { shippingAddressDefaultValues } from "@/lib/constants";


export const metaData: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("No user id");

  const user = await getUserById(userId);
    // console.log(user)
  return (
    <ShippingAddressForm address={shippingAddressDefaultValues}/>
  )
};

export default ShippingAddressPage;
