import React from 'react'

import {DisplayParamProps} from "@/types/DsiplayMainParamProps"

function DisplayMainParam({value,label,size="default"}:DisplayParamProps) {
  
    return (
    <div className="flex flex-col justify-center">
        <div className='flex justify-center'>
            <p className={size=="small"?"text-xs text-gray-500 dark:text-gray-500":"text-sm text-gray-500 dark:text-gray-500"}>{label}</p>
        </div>
        <div className='flex justify-center'>
            <p className={size=="small" ?"text-1xl font-semibold text-gray-900 dark:text-gray-50":"text-3xl font-semibold text-gray-900 dark:text-gray-50"}>
                {value}
            </p>
        </div>
    </div>
  )
}

export default DisplayMainParam