import Card from "@/app/components/card";
import List from "@/app/components/list";
import { CARD_ITEMS } from "@/app/fake-data/card-data";

export default function Home() {
  return (
    <>
      <List title="To do" itemsCount={CARD_ITEMS.length}>
        {CARD_ITEMS.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </List>

      <List title="Doing" itemsCount={0}></List>

      <List title="Done" itemsCount={0}></List>
    </>
  );
}
