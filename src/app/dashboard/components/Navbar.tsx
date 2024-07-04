import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar () {
  return (
    <nav className='col-span-1 row-span-1 w-full bg-secondary p-4 flex flex-row justify-between flex-wrap'>
      
      <Avatar>
        <AvatarImage src='' alt='@shadcn' />
        <AvatarFallback className="font-semibold" >CN</AvatarFallback>
      </Avatar>
    </nav>
  )
}
