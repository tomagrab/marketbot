import { columns, Payment } from './ui/columns';
import DataTable from '@/components/ui/data-table';

async function getData(): Promise<Payment[]> {
  return [
    { id: '728ed52f', amount: 100, status: 'pending', email: 'm@example.com' },
    {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com',
    },
    {
      id: '769ad3ef',
      amount: 200,
      status: 'success',
      email: 'user@domain.com',
    },
  ];
}

export default async function PaymentsPage() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
