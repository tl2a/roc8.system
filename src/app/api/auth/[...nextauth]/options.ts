import type { NextAuthOptions } from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import supabase from '@/lib/supabase'

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: { label: "Username", type: "text", placeholder: "Type your email" },
                password: { label: "Password", type: "password", placeholder: "Type your username" }
            },
            async authorize(credentials, req) {
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const user = await res.json()

                // // If no error and we have user data, return it
                // if (res.ok && user) {
                //     return user
                // }
                // // Return null if user data could not be retrieved
                // return null
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials

                const { data: existingUser } = await supabase
                .from('users')
                .select()
                .eq('email', credentials?.email)
                .eq('password', credentials?.password)

                if (existingUser.length) {
                    return existingUser[0]
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/join'
    }
}