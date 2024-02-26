import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useClickOutside } from 'react-click-outside-hook';
import Loader from '../Loader/Loader';
import { useDebounce } from '@/app/hooks/debounceHook';
import { fetchStreamerByName } from '@/app/api/steamers/fetchStreamers';
import StreamerCard, { StreamerProp } from '../Streamer/StreamerCard';

const Searchbar = () => {

    const [isExpanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [parentRef, isClickedOutside] = useClickOutside();
    const inputRef = useRef<HTMLInputElement>(null);

    const [isLoadingStreamer, setIsLoadingStreamer] = useState(true);

    const [streamersList, setStreamersList] = useState([]);
    const [noStreamers, setNoStreamers] = useState(false);

    const isEmpty = !streamersList || streamersList.length === 0;

    const clearInput = () => {
        if (inputRef.current)
            inputRef.current.value = "";
    }

    const collapse = () => {
        setExpanded(false);
        setSearchQuery("");
        setStreamersList([]);
        setNoStreamers(false);
        clearInput();
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    const prepareSearchQuery = (query: string) => {
        const url = ``;
    }

    const searchStreamer = async () => {
        if (!searchQuery || searchQuery.trim() === "")
            return;
        setIsLoadingStreamer(true);

        const response = await fetchStreamerByName(searchQuery);
        if (response.data && response.data.length === 0) {
            setNoStreamers(true)
        }
        setStreamersList(response.data);
        console.log(response.data);
        setIsLoadingStreamer(false);
    }

    useEffect(() => {
        if (isClickedOutside) {
            collapse();
        }
    }, [isClickedOutside]);

    useDebounce(searchQuery, 500, searchStreamer);

    return (
        // <div className="relative">
        <motion.div
            layout
            transition={{ type: "spring", damping: 22, stiffness: 150 }}
            // transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{ height: isExpanded ? "15rem" : "2.2rem" }}/*position: isExpanded ? "absolute" : "relative" }*/
            // transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            onClick={() => {
                setExpanded(!isExpanded);
                setStreamersList([]);
                setNoStreamers(false);
            }}
            ref={parentRef}
            className="flex flex-col lg:w-[26rem] sm:w-full h-10 bg-[#0F1117ee] rounded-lg shadow-sm shadow-violet-700">
            <div className="w-full min-h-10 flex items-center px-4">
                <span className="text-white align-middle mr-5 cursor-pointer">
                    <SearchIcon sx={{ fontSize: "23px" }} />
                </span>
                <input
                    className="w-full outline-none border-none text-sm font-light text-white rounded-2xl bg-transparent placeholder-white placeholder:opacity-50 focus:placeholder-transparent focus:outline-none"
                    placeholder="Search for streamer..."
                    ref={inputRef}
                    value={searchQuery}
                    onChange={changeHandler}
                />
                <AnimatePresence>
                    {isExpanded && (
                        <motion.span
                            className="text-white align-middle cursor-pointer transition-all duration-300 hover:text-violet-300"
                            key="close-icn"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => collapse()}
                            transition={{ duration: 0.2 }}
                        >
                            <CloseIcon
                                sx={{ fontSize: "23px" }} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            {isExpanded && (<span className="flex min-w-full min-h-[2px] bg-violet-900" />)}
            {isExpanded && (<div className="flex flex-col h-full w-full overflow-hidden overflow-y-auto">
                {/* <div className="flex border-2 w-full h-full items-center justify-center"> */}
                {isLoadingStreamer && isExpanded && (<Loader />)}
                {!isLoadingStreamer && isEmpty && !noStreamers && <span className='flex h-full justify-center items-center text-sm opacity-60'>Start typing to search</span>}
                {!isLoadingStreamer && noStreamers && <span className='flex h-full justify-center items-center text-sm opacity-60'>No streamer found!</span>}
                {!isLoadingStreamer && !isEmpty && streamersList.map((item: StreamerProp, index: number) => (
                    <StreamerCard key={item.id} streamer={item} index={index} />
                ))}
                {/* </div> */}
            </div>
            )}
        </motion.div>
        // </div>
    )
}

export default Searchbar

