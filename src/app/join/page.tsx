'use client'
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { signIn, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useRef, useState } from "react"

export default function Page() {
  const { toast } = useToast()

  const email = useRef("");
  const pass = useRef("");
  
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const { data: session } = useSession({
      required: true,
      onUnauthenticated() {
          // redirect('/api/auth/signin?callbackUrl=/client')
      }
  })

  const onSubmitCred = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/dashboard"
    });
  };

  const onSubmitGithub = async () => {
    const result = await signIn("github", {
      redirect: true,
      callbackUrl: "/dashboard"
    });
  };

  const signUp = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: mail,
        password: password
      }),
    });
    const data = await res.json();
    console.log(data);

    if(data.ok){
      toast({
        variant: "destructive",
        title: `Hi ${name}, your account has been created!`,
        description: "Please sign in now to get started",
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      })

      setName('')
      setMail('')
      setPassword('')
    }
  }

  return session ? redirect('/dashboard') : (
    <div className="flex gap-6 flex-col sm:flex-row">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Make changes to your account here. Click submit when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email1">Email</Label>
              <Input id="email1" value={mail} type="email" onChange={(e) => setMail(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password1">Password</Label>
              <Input id="password1" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className={buttonVariants({
              size: 'lg',
              className: 'w-full',
            })} onClick={signUp}>Submit</Button>
          </CardFooter>
        </Card>
        <Card className="w-full bg-blue-50 mb-4 dark:bg-transparent">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Login to your account here. Click submit when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" onChange={(e) => (email.current = e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={(e) => (pass.current = e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex gap-5">
            <Button className={buttonVariants({
              size: 'lg',
              className: 'w-full',
            })} onClick={onSubmitCred}>Submit</Button>
            <Button className={buttonVariants({
              size: 'lg',
              variant: 'outline',
              className: 'w-full bg-gray-600 hover:bg-gray-500 hover:text-white',
            })} onClick={onSubmitGithub}>Sign In with GitHub</Button>
          </CardFooter>
        </Card>
    </div>
  )
}
