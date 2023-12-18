import Image from 'next/image'
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { AlertCircle, Terminal } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Hi Buddy, you are logged in now
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Stop There!</AlertTitle>
          <AlertDescription>
            You Shall Not Pass!
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
