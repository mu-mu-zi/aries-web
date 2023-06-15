import { ReactNode, useState } from 'react';
import {
  arrow,
  autoUpdate, flip, offset, shift, useDismiss, useFloating, useFocus, useHover, useInteractions, useRole,
} from '@floating-ui/react';

function Tooltip({
  children, title, content, position,
}: {
  children: ReactNode,
  title: string,
  content?: string,
  position?: 'bottom' | 'bottom-start' | 'top'
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: position ?? 'bottom',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({
        mainAxis: 10,
        crossAxis: position === 'bottom-start' ? -24 : 0,
      }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: true });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <div className="gradient-block2 rounded-xl p-4 flex flex-col gap-2 max-w-[420px] shadow-block">
            <div className="text-[#C2D7C7F6] text-[16px]">{title}</div>
            {content && <div className="text-[#99AC9B] text-[14px]">{content}</div>}
          </div>
        </div>
      )}
    </>
  );
}

export default Tooltip;
