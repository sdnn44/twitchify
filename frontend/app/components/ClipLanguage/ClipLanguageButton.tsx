import { useGlobalState } from '@/app/context/globalContextProvider'
import React from 'react'
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import languageFromPrefix from '@/app/utils/languageFormat';

const StreamerInfoButton = () => {

    const { clipLanguage, setClipLanguage, setLoading } = useGlobalState();

    return (
        <div className="flex items-center">
            <div className="flex items-center min-w-28 text-sm font-bold rounded-xl p-1 px-3 mx-1 border-2 border-violet-400">
                <span className="flex items-center"> <VideocamIcon sx={{ mr: "10px" }} />
                    {languageFromPrefix(clipLanguage)}
                </span>
                <span
                    className='relative cursor-pointer hover:text-violet-400 ease-in-out duration-300 ml-2'
                    onClick={() => {
                        setClipLanguage("");
                        setLoading(true);
                    }}
                ><CloseIcon sx={{ fontSize: "16px" }} /></span>
                {/* <div className='relative'><span className='absolute bottom-0 cursor-pointer hover:text-violet-400 ease-in-out duration-300'><CloseIcon sx={{fontSize:"12px"}}/></span></div> */}
            </div>
            <span className='ml-1'>clips and top moments:</span>
        </div>
    )
}

export default StreamerInfoButton
