import {Button, ButtonGroup} from "flowbite-react";
import {useParamsStore} from "@/hooks/useParamsStore";
import {AiOutlineClockCircle, AiOutlineSortAscending} from "react-icons/ai";
import {BsFillStopCircleFill, BsStopwatchFill} from "react-icons/bs";
import React from "react";
import {GiFinishLine, GiFlame} from "react-icons/gi";

type Props = {
    pageSize: number
    setPageSize: (size: number) => void
}

const pageSizeButtons = [4, 8 ,12];
const orderButtons = [
    {
        label: 'Alphabetical',
        icon: AiOutlineSortAscending,
        value: 'make'
    },
    {
        label: 'End date',
        icon: AiOutlineClockCircle,
        value: 'endingSoon'
    },
    {
        label: 'Recently added',
        icon: BsFillStopCircleFill,
        value: 'new'
    }
]
const filterButtons = [
    {
        label: 'Live Auctions',
        icon: GiFlame,
        value: 'live'
    },
    {
        label: 'Ending < 6 hours',
        icon: GiFinishLine,
        value: 'endingSoon'
    },
    {
        label: 'Completed',
        icon: BsStopwatchFill,
        value: 'finished'
    }
]
export default function Filters() {
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams = useParamsStore(state => state.setParams);
    const orderBy = useParamsStore(state => state.orderBy);
    const filteredBy = useParamsStore(state => state.filteredBy);
    
    return (
        <div className='flex justify-between items-center mb-4'>
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>Filter by</span>
                <ButtonGroup>
                    {filterButtons.map(({label, icon: Icon, value}) => (
                        <Button
                            key={value}
                            onClick={() => setParams({filteredBy: value})}
                            color={`${filteredBy === value ? 'red' : 'grey'}`}
                        >
                            <Icon className='mr-3 h-4 w-4'/>
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>Order by</span>
                <ButtonGroup>
                    {orderButtons.map(({label, icon: Icon, value}) => (
                        <Button
                            key={value}
                            onClick={() => setParams({orderBy: value})}
                            color={`${orderBy === value ? 'red' : 'grey'}`}
                        >
                            <Icon className='mr-3 h-4 w-4'/>
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>Page Size</span>
                <ButtonGroup>
                    {pageSizeButtons.map((value, i) => (
                        <Button key={i} 
                            onClick={() => setParams({pageSize: value})}
                            color={`${pageSize === value ? 'red' : 'grey'}`}
                            className='focus:ring-0'
                        >
                            {value}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    )
}