import AppModal from './AppModal';
import { Button } from '../ui/Button';

export function AppConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isConfirming = false,
  onConfirm,
  onClose,
}) {
  const footer = (
    <>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClose}
        disabled={isConfirming}
      >
        {cancelLabel}
      </Button>
      <Button 
        type="button" 
        variant={variant} 
        onClick={onConfirm}
        disabled={isConfirming}
      >
        {isConfirming ? (
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] animate-spin">hourglass_empty</span>
            Processing...
          </span>
        ) : confirmLabel}
      </Button>
    </>
  );

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      isBusy={isConfirming}
      footer={footer}
    >
      <div className="w-full min-w-0 text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
        {description}
      </div>
    </AppModal>
  );
}
