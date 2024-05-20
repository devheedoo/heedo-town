import Card from "./components/card";
import List from "./components/list";

import { CARD_ITEMS } from "./fake-data/card-data";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen">
      <aside className="flex min-h-screen w-24 shrink-0 justify-center bg-[#1C1D22] p-4">
        <h1 className="leading-none text-white">TODO</h1>
      </aside>

      <nav className="flex min-h-screen w-[320px] shrink-0 bg-[#222327] p-6">
        <h2 className="text-3xl leading-none text-white">Projects</h2>
      </nav>

      <section className="flex max-h-screen min-w-0 grow flex-col bg-[#2A2B2F]">
        <header className="flex h-24 shrink-0 items-center border-b border-white/10 p-6">
          <span className="leading-none text-white">
            Welcome back, Heedo 👋
          </span>
        </header>

        <div className="flex min-h-0 grow gap-x-4 overflow-x-scroll p-4">
          <List title="To do" itemsCount={CARD_ITEMS.length}>
            {CARD_ITEMS.map((item) => (
              <Card key={item.title} {...item} />
            ))}
          </List>

          <List title="Doing" itemsCount={0}></List>

          <List title="Done" itemsCount={0}></List>
        </div>
      </section>
    </main>
  );
}
