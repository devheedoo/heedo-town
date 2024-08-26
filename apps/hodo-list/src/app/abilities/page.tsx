"use client";

import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import type { KeyboardEvent } from "react";
import { useState } from "react";

import { abilitiesAtom } from "@/atoms/abilities-atom";
import type { Ability } from "@/types/ability.type";
import { showTodayTimeOrDate } from "@/utils/date-format";

export default function Abilities() {
  const [newAbilityName, setNewAbilityName] = useState("");
  const [abilities, setAbilities] = useAtom(abilitiesAtom);

  function addAbility() {
    if (newAbilityName.trim().length === 0) {
      return;
    }

    const newAbility: Ability = {
      id: nanoid(),
      name: newAbilityName,
      createdAt: new Date().valueOf(),
      value: 0,
    };
    setAbilities((abilities) => [newAbility, ...abilities]);
    setNewAbilityName("");
  }

  function handleKeyUpAddButton(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addAbility();
    }
  }
  return (
    <>
      <div className="mb-4 flex gap-x-2">
        <input
          type="text"
          placeholder="능력치를 적어주세요."
          className="input input-bordered peer w-full placeholder:font-extralight"
          value={newAbilityName}
          required
          onChange={(e) => setNewAbilityName(e.target.value)}
          onKeyUp={handleKeyUpAddButton}
          autoFocus // !!! nonviable on webkit
        />
        <button
          className="btn btn-outline btn-success peer-invalid:btn-disabled"
          onClick={addAbility}
        >
          추가
        </button>
      </div>
      <ul className="flex flex-col gap-y-1">
        {abilities.map((t, i) => (
          <li className="gap flex items-center" key={t.id}>
            <label className="label gap-x-2">
              <span className="label-text">
                {i + 1}. {t.name}
              </span>
              <span className="label-text">{t.value}</span>
              <span className="label-text font-extralight">
                {showTodayTimeOrDate(t.createdAt)}
              </span>
            </label>
          </li>
        ))}
      </ul>{" "}
    </>
  );
}
