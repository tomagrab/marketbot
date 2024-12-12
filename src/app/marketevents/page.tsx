import DataTable from '@/components/ui/data-table';
import prisma from '@/db/db';
import { columns } from '@/app/marketevents/ui/columns';

export default async function MarketEventsPage() {
  const marketEvents = await prisma.marketEvent.findMany({
    include: {
      market: true,
    },
  });

  return <DataTable columns={columns} data={marketEvents} />;
}
