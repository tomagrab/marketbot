import DataTable from '@/components/ui/data-table';
import prisma from '@/db/db';
import { columns } from '@/app/markets/ui/columns';

export default async function MarketsPage() {
  const markets = await prisma.market.findMany({
    include: {
      companies: true,
      industries: true,
    },
  });

  return <DataTable columns={columns} data={markets} />;
}
