import React from 'react'
import { DisplayParamProps } from '@/types/DsiplayMainParamProps'
import { useState, useEffect } from 'react'
import { Input } from '@/components/Input'

function DisplayParam({value,label, setValue,size="default"}:DisplayParamProps) {

  const [editMode,setEditMode] = useState<boolean>(false)

  return (
    <div >
        <div className="grid gap-1 justify-items-center bg-gray-800 w-25 rounded-md">
          <p className="text-2xl pt-5">
            {label}
          </p>
          <div className="text-2xl font-semibold text-gray-900 dark:text-gray-50 p-2" onClick={()=>{setEditMode(!editMode)}}> 
            {/* {editMode?value:<Input placeholder = {value} type="number"/>} */}
            <Input placeholder={value==undefined ? " " :value.toString()} type="number" enableStepper={false} onChange={setValue != undefined ?(e)=>{setValue(e.target.valueAsNumber)}:undefined}/>
          </div>
        </div>
    </div>
  )
}

export default DisplayParam