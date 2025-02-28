"use client";

import { ROUTES } from "@/utils/constants";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineStock } from "react-icons/ai";
import { FaListAlt, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import useSession from "@/hooks/use-session";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { session, clearCustomSession } = useSession();

  return (
    <header className="bg-gray-800 text-white px-28 p-5 w-full mx-auto flex items-center justify-between sticky top-0 z-50 shadow-md">
      <Link
        href={ROUTES.home}
        className="text-2xl font-bold text-center flex gap-2 items-center"
      >
        <AiOutlineStock /> Stock Tracker
      </Link>
      <nav className="flex items-center gap-2 space-x-8">
        <Link href={ROUTES.home}>
          <span
            className={classNames(
              "flex items-center space-x-2 text-lg hover:text-blue-400",
              {
                "text-blue-600": pathname === ROUTES.home,
              }
            )}
          >
            <FaChartLine />
            <span>Stock Tracker</span>
          </span>
        </Link>
        <Link
          href={ROUTES.watchList}
          className={classNames(
            "flex items-center space-x-2 text-lg hover:text-blue-400",
            {
              "text-blue-600": pathname === ROUTES.watchList,
            }
          )}
        >
          <span className="flex items-center space-x-2 text-lg hover:text-blue-400">
            <FaListAlt />
            <span>Watch List</span>
          </span>
        </Link>

        {session && (
          <button
            onClick={() => {
              clearCustomSession();
              router.push(ROUTES.login);
            }}
            className="text-lg hover:text-red-500 flex items-center space-x-2"
          >
            <FaSignOutAlt />
          </button>
        )}
      </nav>
    </header>
  );
};
