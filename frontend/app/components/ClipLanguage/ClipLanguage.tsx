import React, { useState } from 'react'
import { motion, Variants } from "framer-motion";
import { useGlobalState } from '@/app/context/globalContextProvider';
import languageFromPrefix from '@/app/utils/languageFormat';
import { US, PL, TR, DE, IT, FR } from 'country-flag-icons/react/3x2'

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const ClipLanguage = () => {
    const { clipLanguage, setClipLanguage } = useGlobalState();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="filter drop-shadow max-h-1"
        >
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#0F1117ee] shadow-sm shadow-violet-700 text-white border-none rounded-lg py-2 px-4 mb-2 text-sm cursor-pointer w-full min-w-36 text-left flex justify-between items-center"
            >
                {clipLanguage ? languageFromPrefix(clipLanguage) : 'Language'}
                <motion.div
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                >
                    <svg width="10" height="10" viewBox="0 0 20 20" className="fill-current text-white mx-2">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </motion.div>
            </motion.button>
            <motion.ul
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col bg-[#0F1117ee] shadow-violet-700 rounded-lg text-[12px]"
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
                <motion.li variants={itemVariants}
                    className='hover:bg-violet-700/15 cursor-pointer p-2.5 flex'
                    onClick={() => setClipLanguage("en")}>
                    <US title="United States" className="w-[1rem] mr-2" />
                    English
                </motion.li>
                <motion.li variants={itemVariants}
                    className='hover:bg-violet-700/15 cursor-pointer p-2.5 flex'
                    onClick={() => setClipLanguage("pl")}>
                    <PL title="Poland" className="w-[1rem] mr-2" />
                    Polish
                </motion.li>
                <motion.li variants={itemVariants}
                    className='hover:bg-violet-700/15 cursor-pointer p-2.5 flex'
                    onClick={() => setClipLanguage("de")}>
                    <DE title="German" className="w-[1rem] mr-2" />
                    German
                </motion.li>
                <motion.li variants={itemVariants}
                    className='hover:bg-violet-700/15 cursor-pointer p-2.5 flex'
                    onClick={() => setClipLanguage("de")}>
                    <IT title="Italian" className="w-[1rem] mr-2" />
                    Italian
                </motion.li>
                <motion.li variants={itemVariants}
                    className='hover:bg-violet-700/15 cursor-pointer p-2.5 flex'
                    onClick={() => setClipLanguage("fr")}>
                    <FR title="French" className="w-[1rem] mr-2" />
                    French
                </motion.li>
                <motion.li variants={itemVariants}
                    className='hover:bg-violet-700/15 cursor-pointer p-2.5 flex'
                    onClick={() => setClipLanguage("tr")}>
                    <TR title="Turkish" className="w-[1rem] mr-2" />
                    Turkish
                </motion.li>
            </motion.ul>
        </motion.nav>
    );
}

export default ClipLanguage