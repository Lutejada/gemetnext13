'use client'

import { routes } from '../navigation'
import MenuItem from './MenuItem'

export default function MenuOptions () {
  return (
    <>
      {routes.map(route => (
        <MenuItem name={route.name} subRoute={route.subRoute} />
      ))}
    </>
  )
}
