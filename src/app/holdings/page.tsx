import DataTable from '@/components/ui/data-table';
import prisma from '@/db/db';
import { columns } from '@/app/holdings/ui/columns';

export default async function HoldingsPage() {
  const holdings = await prisma.holding.findMany({
    include: {
      portfolio: { include: { user: true } },
      company: { include: { stockSymbol: true, industry: true } },
    },
  });

  return <DataTable columns={columns} data={holdings} />;
}
