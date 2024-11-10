import { db } from '@/lib/db'

import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation'

import { columns } from './components/columns'
import { DashboardCardWrapper } from '@/components/ui/dashboar-wrapper'
import { DataTable } from '@/components/ui/data-table'

const Dashboardpage = async () => {
  const user = await currentProfile()
  // if user is not logged in or dont have authorization
  if (!user) {
    return redirect('/')
  }

  if (
    !user.roles.find(role => role === "ADMIN" || role === "SUPERADMIN")
  ) {
    return redirect('/')
  }

  const users=await db.user.findMany({
    where:{
      NOT:{
        id:user.id
      }
    }
  })



  return (
    <div
      className='max-w-7xl mx-auto px-4 py-8'
    >
      <DashboardCardWrapper title="Dashboard">
        <DataTable
          columns={columns}
          data={users}
          searchKey='name'
        />
      </DashboardCardWrapper>
    </div>
  )
}

export default Dashboardpage
