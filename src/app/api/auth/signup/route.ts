import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const data = await req.json();

  const { name, email, password } = data;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    return NextResponse.json('Invalid input - password should also be at least 7 characters long.', {
      status: 422
    })
  }

  const { data: existingUser } = await supabase
  .from('users')
  .select()
  .eq('email', email)

  if (existingUser?.length) {
    console.log(existingUser);
    
    return new Response('User exists already!', {
      status: 422
    })
  }

  const { error } = await supabase
    .from('users')
    .insert({ name: name, email: email, password: password });

  if(error) {
    console.log(error);
    
      return new Response('Something went wrong, Please try again later!', {
      status: 400
    })
  }

  return NextResponse.json({ 'message': 'Account created successfully!', ok: 200 }, { status: 200 })
}