import Card from "./components/Card";
import List from "./components/List";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <aside className="flex min-h-screen w-24 justify-center bg-[#1C1D22] p-4">
        <h1 className="leading-none text-white">TODO</h1>
      </aside>

      <nav className="flex min-h-screen w-[320px] bg-[#222327] p-6">
        <h2 className="text-3xl leading-none text-white">Projects</h2>
      </nav>

      <section className="min-h-screen w-full bg-[#2A2B2F]">
        <header className="flex h-24 items-center border-b border-white/10 p-6">
          <span className="leading-none text-white">
            Welcome back, Heedo 👋
          </span>
        </header>

        <div className="flex gap-x-4">
          <List>
            <Card />
            <Card />
            <Card />
          </List>
        </div>
      </section>
    </main>
  );
}
