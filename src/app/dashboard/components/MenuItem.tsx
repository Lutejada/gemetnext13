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
      <AccordionItem value={name}>
        <AccordionTrigger>{name}</AccordionTrigger>
        <div className='flex flex-col gap-1 content-center flex-wrap' >
          {subRoute?.length
            ? subRoute.map(sub => (
                <Link className='block w-11/12 ' key={sub.name} href={'/dashboard' + `${path + sub.path}`}>
                  <AccordionContent
                    className='mb-2 bg-blue-700 rounded hover:bg-blue-800 transition duration-150 ease-out hover:ease-in'
                    key={sub.name}
                  >
                    {sub.name}
                  </AccordionContent>
                </Link>
              ))
            : null}
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default MenuItem
