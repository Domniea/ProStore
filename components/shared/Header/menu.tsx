import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle, 
    SheetTrigger 
} from "@/components/ui/sheet";
import UserButton from "./user-button";
import { auth } from "@/auth";

const Menu = async () => {

    const session = await auth()


    return ( 
        <div className="flex justify-end gap-3">
            {/* REGULAR NAV */}
            <nav className="hidden md:flex w-full max-w-xs gap-1">
            <ModeToggle/>
                <Button asChild variant={'ghost'}>
                    <Link href={'/cart'}>
                        <ShoppingCart/> Cart
                    </Link>
                </Button>
                <UserButton/>
            </nav>
            {/* MOBILE NAV */}
            <nav className="md:hidden">
                <Sheet> 
                    <SheetTrigger className='align-middle'>
                        <EllipsisVertical/>
                    </SheetTrigger>
                    <SheetContent className='flex flex-col items-start'>
                        <SheetTitle>
                            Menu
                        </SheetTitle>
                        <SheetDescription></SheetDescription>
                        <ModeToggle/>
                        <Button asChild variant='ghost'>
                            <Link href='/cart'>        
                              <ShoppingCart/> Cart
                            </Link>
                        </Button>
                        <UserButton/>
                        {/* Admin button */}
                           {
                            session?.user?.role === 'admin' && (
                                <Button variant='ghost'> 
                                    <Link href={`/admin/overview`} className='w-full'>
                                        Admin
                                    </Link>
                                </Button>
                                )
                            }
                        {/* Profile button */}
                        <Button variant='ghost'>
                            <Link href={`/user/profile`} className='w-full'>
                                User Profile
                            </Link>
                        </Button>
                        {/* Orders button */}
                        <Button variant='ghost'>
                            <Link href={`/user/orders`} className='w-full'>
                                Order History
                            </Link>
                        </Button>

                    </SheetContent>
                </Sheet>
            </nav>
        </div>
     );
}
 
export default Menu;