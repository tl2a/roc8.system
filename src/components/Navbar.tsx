'use client'
import React from 'react'
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useRouter } from 'next/navigation'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            // redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    const router = useRouter()
    
    return (
        <div className="my-6">
            <Menubar className='flex justify-between'>
                <MenubarMenu>
                    <MenubarTrigger>Roc8 Systems</MenubarTrigger>
                    <MenubarContent>
                        <MenubarRadioGroup value="benoit">
                            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                        </MenubarRadioGroup>
                        <MenubarSeparator />
                        <MenubarItem inset onSelect={() => {
                            router.push('/')
                        }}>Get to Home</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>{session?.user ? session?.user.email : 'User'}</MenubarTrigger>
                    <MenubarContent align="end">
                        <MenubarItem inset onSelect={() => {
                            router.push('/dashboard')
                        }}>Dashboard</MenubarItem>
                        <MenubarItem inset>Settings</MenubarItem>
                        <MenubarSeparator />
                        {session ?
                            <MenubarItem inset onSelect={() => {
                                signOut({ redirect: false }).then(() => {
                                    router.push("/") // Redirect to the dashboard page after signing out
                                });
                            }}>Sign Out</MenubarItem>
                            :
                            <MenubarItem inset onSelect={() => {
                                router.push("/api/auth/signin?callbackUrl=/dashboard")
                            }}>Sign In</MenubarItem>
                        }
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
        )
    }
    
    export default Navbar