
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring configuration for the delay effect
    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            setIsHovering(
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.closest('[role="button"]') !== null
            );
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('resize', checkMobile);
        };
    }, [cursorX, cursorY]);

    // Don't render on mobile/tablets where there's no mouse cursor
    if (isMobile) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-orange-600 rounded-full z-[10000] pointer-events-none"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Large circle trail with delay */}
            <motion.div
                className="fixed top-0 left-0 border border-orange-600/50 rounded-full z-[10000] pointer-events-none"
                animate={{
                    width: isHovering ? 60 : 40,
                    height: isHovering ? 60 : 40,
                    backgroundColor: isHovering ? 'rgba(234, 88, 12, 0.1)' : 'transparent',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    );
};

export default CustomCursor;
