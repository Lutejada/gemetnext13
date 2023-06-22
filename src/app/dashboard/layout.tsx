import Navbar from './components/Navbar'
import { Sidebar } from './components/Sidebar'

export default function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full grid grid-cols-[220px_1fr] grid-rows-[70px_1fr]'>
      <Sidebar />
      <Navbar />
      <main className='col-start-2 p-4'>{children}</main>
    </div>
  )
}
