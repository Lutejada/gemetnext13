import { Inter } from 'next/font/google'
import { LoginButton } from './BtnAuht'
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

export default async function Home () {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main>
      <h1>Pagina Principal</h1>
      <p>Aqui debe estar el login</p>
      <LoginButton/>
    </main>
  )
}
