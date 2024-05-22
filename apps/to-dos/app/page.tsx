"use client";

import { useAtom } from "jotai";

import { doingsAtom, donesAtom, toDosAtom } from "@/app/atoms/tasks-atoms";
import Card from "@/app/components/card";
import List from "@/app/components/list";

export default function Home() {
  const [toDos] = useAtom(toDosAtom);
  const [doings] = useAtom(doingsAtom);
  const [dones] = useAtom(donesAtom);

  return (
    <>
      <List title="To do" itemsCount={toDos.length}>
        {toDos.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </List>

      <List title="Doing" itemsCount={doings.length}>
        {doings.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </List>

      <List title="Done" itemsCount={dones.length}>
        {dones.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </List>
    </>
  );
}
