import classNames from "classnames";

export type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  subtitle: string;
  onConfirm: VoidFunction;
  onClose: VoidFunction;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

export const ConfirmModal = ({
  isOpen,
  title,
  subtitle,
  onConfirm,
  onClose,
  confirmButtonText = "확인",
  cancelButtonText = "취소",
}: ConfirmModalProps) => {
  const handleClickConfirmButton = () => {
    onConfirm();
    onClose();
  };

  return (
    <dialog className={classNames("modal", { "modal-open": isOpen })}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{subtitle}</p>
        <div className="modal-action">
          <form method="dialog" className="flex items-center gap-x-2">
            <button
              className="btn btn-success"
              onClick={handleClickConfirmButton}
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
