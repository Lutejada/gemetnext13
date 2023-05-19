import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Route } from '../navigation'

interface Props {
  name: string
  subRoute?: Route[]
}

const MenuItem = ({ name, subRoute }: Props) => {
  return (
    <Accordion type='single' collapsible className='text-secondary'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>{name}</AccordionTrigger>
        {subRoute?.length
          ? subRoute.map(sub => (
              <AccordionContent key={sub.name}>{sub.name}</AccordionContent>
            ))
          : null}
      </AccordionItem>
    </Accordion>
  )
}

export default MenuItem
