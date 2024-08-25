"use client";

import { Ability } from "@/types/ability.type";
import { showTodayTimeOrDate } from "@/utils/date-format";
import classNames from "classnames";
import { nanoid } from "nanoid";
import { useState } from "react";
import type { KeyboardEvent } from "react";

export type EditAbilitiesModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export const EditAbilitiesModal = ({
  isOpen,
  onClose,
}: EditAbilitiesModalProps) => {
  const [newAbilityTitle, setNewAbilityTitle] = useState("");
  const [abilities, setAbilities] = useState<Ability[]>([]);

  function addAbility() {
    if (newAbilityTitle.trim().length === 0) {
      return;
    }

    const newAbility: Ability = {
      id: nanoid(),
      title: newAbilityTitle,
      createdAt: new Date().valueOf(),
      value: 0,
    };
    setAbilities((abilities) => [newAbility, ...abilities]);
    setNewAbilityTitle("");
  }

  function handleKeyUpAddButton(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addAbility();
    }
  }

  return (
    <dialog
      id="edit_abilities_modal"
      className={classNames("modal", { "modal-open": isOpen })}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">능력치 관리하기</h3>
        <p className="py-4">능력치 추가/수정</p>

        <div className="mb-4 flex gap-x-2">
          <input
            type="text"
            placeholder="할 일을 적어주세요."
            className="input input-bordered peer w-full placeholder:font-extralight"
            value={newAbilityTitle}
            required
            onChange={(e) => setNewAbilityTitle(e.target.value)}
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
                  {i + 1}. {t.title}
                </span>
                <span className="label-text">{t.value}</span>
                <span className="label-text font-extralight">
                  {showTodayTimeOrDate(t.createdAt)}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="modal-action">
          <form method="dialog" className="flex items-center gap-x-2">
            <button
              className="btn btn-success peer-invalid:btn-disabled"
              onClick={() => {
                onClose();
              }}
            >
              확인
            </button>
            <button className="btn btn-outline btn-success" onClick={onClose}>
              취소
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
