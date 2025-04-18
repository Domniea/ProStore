'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
    DropdownMenu, 
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import {
    SunMoon,
    MoonIcon,
    SunIcon
} from 'lucide-react'



const ModeToggle = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    useEffect(()=> {
        setMounted(true)
    }, [])

    if(!mounted) {
        return null
    }

  return (

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                {
                    theme === 'system' ? (
                     <SunMoon/>
                    ) : theme === 'dark' ? (
                    <MoonIcon/>
                    ) : (
                     <SunIcon/>
                    )
                }
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                Appearance
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuCheckboxItem 
                checked={theme === 'system'}
                onClick={() => setTheme('system')}
            >
                System
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
                checked={theme === 'dark'}
                onClick={() => setTheme('dark')}    
            >
                dark
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
                checked={theme === 'light'}
                onClick={() => setTheme('light')}
            >
                light
            </DropdownMenuCheckboxItem>
            
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default ModeToggle
