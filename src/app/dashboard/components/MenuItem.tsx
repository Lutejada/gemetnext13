import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Route } from '../navigation'
import Link from 'next/link'

interface Props {
  name: string
  path: string
  subRoute?: Route[]
}

const MenuItem = ({ path, name, subRoute }: Props) => {
  return (
    <Accordion type='single' collapsible className='text-secondary'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>{name}</AccordionTrigger>
        {subRoute?.length
          ? subRoute.map(sub => (
              <Link key={sub.name} href={'/dashboard'+`${path + sub.path}`}>
                <AccordionContent key={sub.name}>{sub.name}</AccordionContent>
              </Link>
            ))
          : null}
      </AccordionItem>
    </Accordion>
  )
}

export default MenuItem
