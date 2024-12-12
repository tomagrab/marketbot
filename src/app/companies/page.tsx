import DataTable from '@/components/ui/data-table';
import { columns } from '@/app/companies/ui/columns';
import prisma from '@/db/db';

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({
    include: {
      industry: true,
      market: true,
      stockSymbol: true,
    },
  });

  return <DataTable columns={columns} data={companies} />;
}
