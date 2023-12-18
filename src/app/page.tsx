import Image from 'next/image'
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        // <UserCard user={session?.user} pagetype={"Home"} />
        <h1 className="text-2xl text-center">Hi Buddy, you are logged in now</h1>
      ) : (
        <h1 className="text-5xl text-center">You Shall Not Pass!</h1>
      )}
    </>
  )
}
