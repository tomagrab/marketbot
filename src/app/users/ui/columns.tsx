'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DataTableColumnHeader from '@/components/ui/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { Prisma } from '@prisma/client';

export const columns: ColumnDef<
  Prisma.UserGetPayload<{
    include: { portfolios: { include: { holdings: true } } };
  }>
>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    // This column is for the number of portfolios
    id: 'user.portfolios',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Portfolios" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return user.portfolios.length;
    },
  },
  {
    // This column is for total holdings
    id: 'user.portfolios.holdings',
    header: () => <div className="text-right">Total Holdings</div>,
    cell: ({ row }) => {
      const user = row.original;
      const total = user.portfolios
        .flatMap(p => p.holdings)
        .reduce((acc, holding) => {
          // holding.quantity is a Decimal, convert to number
          return acc + Number(holding.quantity);
        }, 0);

      return (
        <div className="text-right font-medium">
          {total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
