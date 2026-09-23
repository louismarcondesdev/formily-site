import { topBarMessages } from "@/config/site";

export function TopBar() {
  return (
    <div className="bg-fm-indigo text-white">
      <ul className="mx-auto flex max-w-7xl items-center justify-center gap-x-8 px-4 py-2 text-xs font-medium sm:justify-between sm:px-6 lg:px-8">
        {topBarMessages.map((m, i) => (
          <li key={m} className={i === 0 ? "" : i === 1 ? "hidden sm:block" : "hidden lg:block"}>
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
