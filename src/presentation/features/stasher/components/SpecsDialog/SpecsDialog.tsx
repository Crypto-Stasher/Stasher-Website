import React, { useEffect, useRef } from 'react';
import type { ProductSpecGroup } from '@models/ProductSpecGroup.type';

interface SpecsDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  specGroups: ProductSpecGroup[];
  note: string;
}

/**
 * Full-specification modal.
 *
 * Built on the native <dialog> element deliberately: `showModal()` gives focus
 * trapping, Escape-to-close, the top layer and background inertness for free,
 * all of which are easy to get subtly wrong by hand.
 */
export const SpecsDialog: React.FC<SpecsDialogProps> = ({
  open,
  onClose,
  title,
  specGroups,
  note,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      // The dialog stays mounted, so without this it reopens wherever the
      // reader left off last time.
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The dialog closes itself on Escape without telling React, so mirror its
  // own close event back into state rather than tracking Escape separately.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, [onClose]);

  // <dialog> makes the page inert but does not stop it scrolling behind the
  // modal, which reads as the page sliding under a fixed panel.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => { root.style.overflow = previous; };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="specs-dialog"
      aria-labelledby="specs-dialog-title"
      /* A click landing on the dialog itself is a click on the backdrop: the
         panel inside stops its own clicks from reaching here. */
      onClick={onClose}
    >
      <div className="specs-dialog-panel" onClick={(event) => event.stopPropagation()}>
        <header className="specs-dialog-header">
          <div>
            <p className="section-title">Specifications</p>
            <h2 id="specs-dialog-title" className="specs-dialog-title">{title}</h2>
          </div>
          <button
            type="button"
            className="specs-dialog-close"
            onClick={onClose}
            aria-label="Close specifications"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="specs-dialog-body" ref={bodyRef}>
          <div className="product-specs">
            {specGroups.map((group) => (
              <div key={group.group} className="product-spec-group">
                <h3 className="product-spec-group-title">{group.group}</h3>
                <dl className="product-spec-list">
                  {group.specs.map((spec) => (
                    <div key={spec.name} className="product-spec-row">
                      <dt>{spec.name}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <p className="product-spec-note">{note}</p>
        </div>
      </div>
    </dialog>
  );
};
