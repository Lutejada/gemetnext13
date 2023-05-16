import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
    <main>
      <h1>Pagina Principal</h1>
      <p>Aqui debe estar el login</p>
    </main>
  )
}
