import { ReactNode, useState } from 'react';
import {
  autoUpdate, flip, offset, shift, useDismiss, useFloating, useFocus, useHover, useInteractions, useRole,
} from '@floating-ui/react';

function Tooltip({ children, title, content }: {
  children: ReactNode,
  title: string,
  content?: string
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
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
          <div className="gradient-block2 rounded-xl p-4 flex flex-col gap-2 max-w-[420px]">
            <div className="text-[#C2D7C7F6] text-[16px]">{title}</div>
            {content && <div className="text-[#99AC9B] text-[14px]">{content}</div>}
          </div>
        </div>
      )}
    </>
  );
}

export default Tooltip;
