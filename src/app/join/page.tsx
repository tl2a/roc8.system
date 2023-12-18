'use client'
import { Button } from "@/components/ui/button"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { signIn } from "next-auth/react"
import { useRef } from "react"

export default function Page() {
  const name = useRef("");
  const email = useRef("");
  const mail = useRef("");
  const password = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: pass.current,
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
        name: name.current,
        email: mail.current,
        password: password.current
      }),
    });
    const data = await res.json();
    console.log(data);

    
  }

  return (
    <div className="flex gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" onChange={(e) => (name.current = e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email1">Email</Label>
              <Input id="email1" type="email" onChange={(e) => (mail.current = e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password1">Password</Label>
              <Input id="password1" type="password" onChange={(e) => (password.current = e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={signUp}>Submit</Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
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
          <CardFooter>
            <Button onClick={onSubmit}>Submit</Button>
          </CardFooter>
        </Card>
    </div>
  )
}
