'use client'

// import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";



const CredentialsSignInForm = () => {
    // const [isView, setIsView] = useState(false)

    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ''
    })

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    const SignInButton = () => {
        const { pending } = useFormStatus()

        return  (
            <Button disabled={pending} className="w-full" variant='default'>
                {
                    pending ? 'Signing in ...' : 'Sign in'
                }
            </Button>
        )
    }


    return ( 
        <form action={action}>
            <input type="hidden" name='callbackUrl' value={callbackUrl}/>
            <div className='space-y-6'>

                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        // value={signInDefaultValues.email}
                        id='email'
                        name='email'
                        type='email'
                        required
                        autoComplete='email'
                        placeholder={signInDefaultValues.email}
                    />
                </div>
                <div>
                    <Label htmlFor='email'>Password</Label>
                    <Input
                        // value={signInDefaultValues.password}
                        id='password'
                        name='password'
                        // type={isView ? 'text' : 'password'}
                        type="password"
                        required
                        autoComplete='password'
                        placeholder={signInDefaultValues.password}
                    />
                </div>
                <div>
                    <SignInButton/>
                </div>
                { 
                    data && !data.success && 
                    ( 
                        <div className='text-center text-destructive'>
                            {data.message}
                        </div> 
                    )
                }
                <div className="text-sm text-center text-muted-foreground">
                    {`Don't have an account? `}
                    <Link href='/sign-up' target='_self' className="link">Sign up</Link>
                </div>
            </div>
        </form>
     );
}
 
export default CredentialsSignInForm;