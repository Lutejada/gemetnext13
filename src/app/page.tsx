import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Pagina Principal</h1>
      <p>Aqui debe estar el login</p>
    </main>
  )
}
