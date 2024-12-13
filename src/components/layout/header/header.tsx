import { ModeToggle } from '@/components/theme/mode-toggle/mode-toggle';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 backdrop-blur-lg md:px-8">
      <div className="flex items-center space-x-4">
        <Link
          href={`/`}
          className="text-xl font-bold text-gray-800 dark:text-gray-200"
        >
          MarketBot
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link
            href={`/about`}
            className="text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300"
          >
            About
          </Link>
          <Link
            href={`/blog`}
            className="text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300"
          >
            Blog
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
      </div>
    </header>
  );
}
