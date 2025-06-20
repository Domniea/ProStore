'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useTransition } from "react";
import {
  createPaypalOrder,
  approvePaypalOrder,
  updateOrderToPaidCOD,
  deliverOrder
} from "@/lib/actions/order.actions";
import { toast } from "sonner";
import StripePayment from "./stripe-payment";



const OrderDetailsTable = ({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret
}: {
  order: Omit<Order, 'paymentResult'>;
  paypalClientId: string;
  isAdmin: boolean,
  stripeClientSecret: string | null
}) => {
  const {
    id,
    itemsPrice,
    shippingAddress,
    orderitems,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = order;

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = "";

    if (isPending) {
      status = "Loading PayPal...";
    } else if (isRejected) {
      status = "Error Loading Paypal";
    }
    return status;
  };

  const handleCreatePaypalOrder = async () => {
    const res = await createPaypalOrder(order.id);

    if (!res.success) {
      toast.error(res.message);
    } else {
        toast(res.message)
    }
    return res.data;
  };

  const handleApprovePaypalOrder = async (data: {orderID: string}) => {
    const res = await approvePaypalOrder(order.id, data);

    if (!res.success) {
      toast.error(res.message);
    }
  };

  // Button to mark as paid
  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition()

    return (
      <Button 
        type="button" 
        disabled={isPending} 
        onClick={() => startTransition(async () => {
          const res = await updateOrderToPaidCOD(order.id)

          if (!res.success) {
            toast.error(res.message);
          } else {
              toast(res.message)
          }
          
      })}>
        {
          isPending ? 'processing...' : 'Mark As Paid' 
        }
      </Button>
    )
  }

   // Button to mark as delivered
   const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition()

    return (
      <Button 
        type="button" 
        disabled={isPending} 
        onClick={() => startTransition(async () => {
          const res = await deliverOrder(order.id)

          if (!res.success) {
            toast.error(res.message);
          } else {
              toast(res.message)
          }
        
      })}>
        {
          isPending ? 'processing...' : 'Mark As Delivered' 
        }
      </Button>
    )
  }
  
  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(id)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-4-y overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant={"secondary"}>
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant={"destructive"}>Not Paid</Badge>
              )}
            </CardContent>
          </Card>

          <Card className="my-2">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className="mb-2">
                {shippingAddress.streetAddress}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant={"secondary"}>
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant={"destructive"}>Not Delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link href={`/products/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width="50"
                            height="50"
                          />
                          <span>{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-right">{item.price}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="w-full my-2 md:my-0">
          <Card className="w-full">
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax Price</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
              {/* paypal payment */}
              {!isPaid && paymentMethod === "PayPal" && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePaypalOrder}
                      onApprove={handleApprovePaypalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}

              {/* Stripe Paymen */}
              {
               !isPaid && paymentMethod === 'Stripe' && stripeClientSecret && (
                <StripePayment
                  priceInCents={Number(totalPrice) * 100}
                  orderId={order.id}
                  clientSecret={stripeClientSecret}
                />
               )
              }
            {/* Cash On Delivery */}
            {
              isAdmin && !isPaid && paymentMethod === 'CashOnDelivery' && (
                <MarkAsPaidButton/>
              )
            }
            {
              isAdmin && isPaid && !isDelivered && (
                <MarkAsDeliveredButton/>
              )
            }
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
 
export default OrderDetailsTable;