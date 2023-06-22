'use client'

import { routes } from '../navigation'
import MenuItem from './MenuItem'

export default function MenuOptions () {
  return (
    <>
      {routes.map(route => (
        <MenuItem
          key={route.name}
          name={route.name}
          path={route.path}
          subRoute={route.subRoute}
        />
      ))}
    </>
  )
}
