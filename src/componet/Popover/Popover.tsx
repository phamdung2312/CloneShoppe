import { useFloating, FloatingArrow, FloatingPortal, arrow, Placement } from '@floating-ui/react'
import React, { ElementType, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
interface PopoverProps {
  children: React.ReactNode
  listPopover: React.ReactNode
  className: string
  as?: ElementType
  initialOpen?: boolean
  placementPopover?: Placement
  topPopover?: string
}
export default function Popover({
  children,
  listPopover,
  placementPopover,
  className,
  as: Element = 'div',
  initialOpen,
  topPopover
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const arrowRef = useRef(null)
  const { y, x, refs, context, strategy, middlewareData } = useFloating({
    placement: placementPopover,
    middleware: [
      arrow({
        element: arrowRef
      })
    ]
  })

  const handleHover = () => {
    setIsOpen(true)
  }
  const handleOffHover = () => {
    setIsOpen(false)
  }
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={handleHover} onMouseLeave={handleOffHover}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='bg-white text-black rounded-sm shadow-lg border-gray-200 top-[100px]'
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: topPopover || y,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(1)' }}
              transition={{ duration: 0.2 }}
            >
              <FloatingArrow fill='white' stroke='white' ref={arrowRef} context={context} style={{ top: '-13px' }} />
              {listPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
