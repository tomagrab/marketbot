import DataTable from '@/components/ui/data-table';
import prisma from '@/db/db';
import { columns } from '@/app/users/ui/columns';

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      portfolios: {
        include: {
          holdings: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
