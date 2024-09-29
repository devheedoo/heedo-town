import classNames from "classnames";
import { useState } from "react";

export type TextInputModalProps = {
  isOpen: boolean;
  title: string;
  subtitle: string;
  onConfirm: (inputText: string) => void;
  onClose: VoidFunction;
  defaultInputText?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

export const TextInputModal = ({
  isOpen,
  title,
  subtitle,
  onConfirm,
  onClose,
  defaultInputText = "",
  confirmButtonText = "확인",
  cancelButtonText = "취소",
}: TextInputModalProps) => {
  const [inputText, setInputText] = useState(defaultInputText);

  return (
    <dialog className={classNames("modal", { "modal-open": isOpen })}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{subtitle}</p>

        <input
          type="text"
          className="input input-bordered w-full max-w-xs font-medium text-gray-200"
          onChange={(e) => setInputText(e.target.value)}
          autoFocus
          value={inputText}
        />

        <div className="modal-action">
          <form method="dialog" className="flex items-center gap-x-2">
            <button
              className="btn btn-success"
              onClick={() => {
                onConfirm(inputText);
                onClose();
              }}
            >
              {confirmButtonText}
            </button>
            <button className="btn btn-outline btn-success" onClick={onClose}>
              {cancelButtonText}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
