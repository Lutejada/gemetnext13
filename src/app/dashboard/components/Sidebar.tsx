import React from 'react'
import MenuOptions from './MenuOptions'

export const Sidebar = () => {
  return (
    <aside className='row-span-2 bg-primary p-2'>
      <h2 className='text-secondary font-semibold text-center my-3'>Company Logo</h2>
      <section className='flex flex-col gap-3' >
      <MenuOptions />
      </section>
    </aside>
  )
}
