import React from 'react'
import MenuOptions from './MenuOptions'

export const Sidebar = () => {
  return (
    <aside className='row-span-2 bg-primary p-2'>
      <p className='text-secondary'>sidebar</p>
      <MenuOptions />
    </aside>
  )
}
