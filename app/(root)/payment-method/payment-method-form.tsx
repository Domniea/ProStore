"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { paymentMethodSchema } from "@/lib/validators";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";


const PaymentMethodForm = ({
  preferredPaymentMehtod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMehtod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const handleSubmitForm = async (value :z.infer<typeof paymentMethodSchema>) => {
    startTransition( async () => {
        const res = await updateUserPaymentMethod(value)

        if (!res.success) {
            toast.error(res.message)
            return
        }
        router.push('/place-order')
    })
  }

  return (
    <>
    <div className='max-w-md mx-auto space-y-4'>
      <h1 className='h2-bold mt-4'>Shipping Address</h1>
      <p className='text-sm text-muted-foreground'>
        Please enter and address to ship to
      </p>
      <Form {...form}>
        <form
          method='post'
          className='space-y-4'
          onSubmit={form.handleSubmit(handleSubmitForm)}
        >
          <div className='flex flex-col md:flex-row gap-5'>
    
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <FormField
                control={form.control}
                name="type"
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} className="flex flex-col space-y-2">
                                {
                                    PAYMENT_METHODS.map((paymentMethod) => (
                                        <FormItem key={paymentMethod} className="flex items-center space-x-3 space-y-0`">
                                            <FormControl>
                                                <RadioGroupItem value={paymentMethod} checked={ field.value === paymentMethod }/>
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                { paymentMethod }
                                            </FormLabel>
                                        </FormItem>
                                    ))
                                }
                            </RadioGroup>      
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
          </div>
          <div className='flex gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader className='w-4 h-4 animate-spin' />
              ) : (
                <ArrowRight className='w-4 h-4' />
              )}{' '}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </>
  );
};

export default PaymentMethodForm;
