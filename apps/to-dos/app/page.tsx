"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { toDosAtom } from "@/app/atoms/to-dos-atom";
import Card from "@/app/components/card";
import List from "@/app/components/list";
import { DOINGS, DONES } from "@/app/fake-data/card-data";

const doingsAtom = atomWithStorage("doings", DOINGS);
const donesAtom = atomWithStorage("dones", DONES);

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
