import React, { useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';

const PERIOD = [
    {
        id: 1,
        time: "Today"
    },
    {
        id: 2,
        time: "7 days"
    },
    {
        id: 3,
        time: "30 days"
    },
    {
        id: 4,
        time: "All time"
    }
];

const Filter = () => {

    const [activeFilter, setActiveFilter] = useState(4);

    const handleFilterClick = (id: number) => {
        setActiveFilter(id);
    };

    return (
        <div className="flex flex-row items-center">
            <FilterListIcon />
            <h2 className='mx-2'>Popular filters:</h2>
            {PERIOD.map((option) => (
                <div
                    key={option.id}
                    className={`flex text-sm font-bold rounded-3xl p-1 px-3 mx-1 cursor-pointer border-2 border-violet-400 hover:bg-violet-300 transition duration-300 ease-in hover:text-violet-800 ${option.id === activeFilter
                        ? 'bg-violet-300 text-violet-800'
                        : 'hover:bg-violet-300 hover:text-violet-800'
                        }
                    `}
                    onClick={() => handleFilterClick(option.id)}
                >
                    {option.time}
                </div>
            ))}
        </div>
    )
}

export default Filter