"use client";

import classNames from "classnames";

import Calendar from "@/components/calendar/calendar";

export type ArchievesModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export const ArchievesModal = ({ isOpen, onClose }: ArchievesModalProps) => {
  return (
    <dialog
      id="archieves_modal"
      className={classNames("modal", { "modal-open": isOpen })}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">기록 되돌아보기</h3>
        <p className="py-4">되돌아볼 날짜 선택</p>
        <Calendar />

        <div className="modal-action">
          <form method="dialog" className="flex items-center gap-x-2">
            <button className="btn btn-outline btn-success" onClick={onClose}>
              닫기
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
