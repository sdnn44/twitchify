import React, { useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import { subDays, format, startOfDay } from 'date-fns';
import { useGlobalState } from '@/app/context/globalContextProvider';
import { handleGameClick } from '@/app/api/fetchClips';

const startOfCurrentDate = startOfDay(new Date());

const PERIOD = [
    {
        id: 1,
        periodLabel: "Today",
        date: format(startOfCurrentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
    },
    {
        id: 2,
        periodLabel: "7 days",
        date: format(subDays(startOfCurrentDate, 7), "yyyy-MM-dd'T'HH:mm:ss'Z'")
    },
    {
        id: 3,
        periodLabel: "30 days",
        date: format(subDays(startOfCurrentDate, 30), "yyyy-MM-dd'T'HH:mm:ss'Z'")
    },
    {
        id: 4,
        periodLabel: "All time",
    }
];

const Filter = () => {

    const { gameId, setPeriodLabel, setPeriodTime, setLoading } = useGlobalState();
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
                    onClick={() => {
                        handleFilterClick(option.id);
                        setPeriodLabel(option.periodLabel);
                        setPeriodTime(option.date)
                        // handleGameClick(gameId, option.periodLabel, option.date);
                        setLoading(true);
                    }}
                >
                    {option.periodLabel}
                </div>
            ))}
        </div>
    )
}

export default Filter