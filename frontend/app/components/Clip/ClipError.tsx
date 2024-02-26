import React from 'react'
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const ClipError = () => {
    return (
        <div className='flex justify-center py-6'>
            <VideocamOffIcon sx={{color: " rgb(167 139 250)", mx:"10px"}} />
            <p className='flex items-center justify-center text-white opacity-70'>No clips to be displayed </p>
        </div>
    )
}

export default ClipError