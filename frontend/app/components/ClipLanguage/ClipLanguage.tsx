import React, { useState } from 'react'
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const ClipLanguage = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="filter drop-shadow"
        >
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
                className="appearance-none bg-[#0F1117ee] shadow-sm shadow-violet-700 text-white border-none rounded-lg py-2 px-4 text-sm cursor-pointer w-full text-left mb-2 flex justify-between items-center"
            >
                Languages
                <motion.div
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                >
                    <svg width="15" height="15" viewBox="0 0 20 20" className="fill-current text-white">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </motion.div>
            </motion.button>
            <motion.ul
                className="pointer-events-none flex flex-col gap-2.5 bg-[#0F1117ee] shadow-violet-700 p-2.5 rounded-lg"
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                        }
                    }
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
            >
                <motion.li variants={itemVariants} className='cursor-pointer hover:bg-purple-600'>Item 1 </motion.li>
                <motion.li variants={itemVariants}>Item 2 </motion.li>
                <motion.li variants={itemVariants}>Item 3 </motion.li>
                <motion.li variants={itemVariants}>Item 4 </motion.li>
                <motion.li variants={itemVariants}>Item 5 </motion.li>
            </motion.ul>
        </motion.nav>
    );
}

export default ClipLanguage