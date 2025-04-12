/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProfileSchema } from "@/lib/validators";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";

const ProfileForm = () => {
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
    },
  });

  const onSubmit = () => {
    return ;
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled
                      placeholder="email"
                      className="input-field"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="name"
                      className="input-field"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="button col-span-2 w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting...' : 'Update Profile'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
