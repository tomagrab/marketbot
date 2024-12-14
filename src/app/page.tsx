import prisma from '@/db/db';
import MarketsCharts from '@/components/layout/home/markets-charts/markets-charts';

export default async function Home() {
  // Fetch data for charts
  const markets = await prisma.market.findMany({
    select: {
      name: true,
      companies: {
        select: {
          name: true,
        },
      },
      industries: {
        select: {
          name: true,
        },
      },
    },
  });

  return <MarketsCharts markets={markets} />;
}
