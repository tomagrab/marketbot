import DataTable from '@/components/ui/data-table';
import prisma from '@/db/db';
import { columns } from '@/app/portfolios/ui/columns';

export default async function PortfoliosPage() {
  const portfolios = await prisma.portfolio.findMany({
    include: {
      user: true,
      holdings: true,
    },
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={portfolios} />
    </div>
  );
}
