"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import type { KeyboardEvent } from "react";
import { useState } from "react";

import { abilitiesAtom } from "@/atoms/abilities-atom";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { TextInputModal } from "@/components/modals/text-input-modal";
import type { Ability } from "@/types/ability.type";
import { useBoolean } from "@/utils/use-boolean";

export default function Abilities() {
  const [newAbilityName, setNewAbilityName] = useState("");
  const [updatingAbilityId, setUpdatingAbilityId] = useState<string | null>(
    null
  );

  const [
    isOpenUpdateAbilityModal,
    openUpdateAbilityModal,
    closeUpdateAbilityModal,
  ] = useBoolean(false);
  const [
    isOpenConfirmRemoveModal,
    openConfirmRemoveModal,
    closeConfirmRemoveModal,
  ] = useBoolean(false);

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

  const handleClickRemoveButton = (abilityId: string) => {
    setUpdatingAbilityId(abilityId);
    openConfirmRemoveModal();
  };

  const removeAbility = () => {
    const updatedAbilities = abilities.filter(
      (ability) => ability.id !== updatingAbilityId
    );
    setAbilities(updatedAbilities);
  };

  const handleClickAbilityName = (abilityId: string) => {
    setUpdatingAbilityId(abilityId);
    openUpdateAbilityModal();
  };

  const updateAbilityName = (name: string) => {
    const updatedAbilities = abilities.map((ability) =>
      ability.id === updatingAbilityId ? { ...ability, name } : ability
    );
    setAbilities(updatedAbilities);
  };

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
      <ul className="flex gap-2">
        {abilities.map((ability) => (
          <li
            className="flex items-center rounded-lg bg-slate-700 px-4 py-1.5"
            key={ability.id}
          >
            <label className="label gap-x-2 p-0">
              <button
                className="text-sm normal-case text-slate-900"
                onClick={() => handleClickAbilityName(ability.id)}
              >
                {ability.name} {ability.value}
              </button>
              <button onClick={() => handleClickRemoveButton(ability.id)}>
                <XMarkIcon className="size-4" />
              </button>
            </label>
          </li>
        ))}
      </ul>

      {isOpenConfirmRemoveModal && (
        <ConfirmModal
          isOpen={isOpenConfirmRemoveModal}
          title={"능력치 제거"}
          subtitle={"제거하시겠습니까?"}
          onConfirm={removeAbility}
          onClose={closeConfirmRemoveModal}
        />
      )}

      {isOpenUpdateAbilityModal && (
        <TextInputModal
          isOpen={isOpenUpdateAbilityModal}
          title={"능력치명 변경"}
          subtitle={"능력치명을 입력해주세요."}
          onConfirm={updateAbilityName}
          onClose={closeUpdateAbilityModal}
          defaultInputText={
            abilities.find((ability) => ability.id === updatingAbilityId)?.name
          }
        />
      )}
    </>
  );
}
