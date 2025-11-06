import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/Tabs";
import {Rtc} from "@/components/Rtc"
import DisplayParam from "./DisplayParam";
import { Button } from "./Button";
import { useWebSocketData } from '@/providers/WebSocketProvider';
import { UserLuxParams } from '@/types/UserLuxParams';
import { PidValue } from '@/types/PidValue';
import { FilterValue } from '@/types/FilterValue';
import { useState } from 'react';

interface FormUser {
  userParams:UserLuxParams,
  pidValue:PidValue,
  filterValue:FilterValue
}

function ConfigView() {

  const {userParams, pidValue, filterValue} = useWebSocketData()
  const [value, setValue] = useState(0)

  const [form, setForm] = useState<FormUser|null>(null)

  return (
    <div>        
        <Tabs defaultValue="tab1">
            <div className="flex justify-center">
              <TabsList variant="solid" className="gap-5">
                  <div className="px-3">
                    <TabsTrigger value="tab1">Params</TabsTrigger>
                    <TabsTrigger value="tab2">PID</TabsTrigger>
                    <TabsTrigger value="tab3">Filter</TabsTrigger>
                    <TabsTrigger value="tab4">RTC</TabsTrigger>
                  </div>
                  <Button variant="secondary">Save</Button>
              </TabsList>
            </div>
            <div className="ml-2 mt-4">
              <TabsContent
                value="tab1"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
               <div className="grid grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5" >
                <p>{value}</p>
                <DisplayParam label="SP" value={userParams?.setPoint} setValue={setValue}/>
                <DisplayParam label="SP_F" value={userParams?.setPointFinal}/>
                <DisplayParam label="Time" value={userParams?.riseTime}/>
               </div>
              </TabsContent>
              <TabsContent
                value="tab2"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
               <div className="grid grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5" >
                <DisplayParam label="Kp" value={pidValue?.kp}/>
                <DisplayParam label="Ki" value={pidValue?.ki}/>
                <DisplayParam label="Kd" value={pidValue?.kd}/>
               </div>
              </TabsContent>
              <TabsContent
                value="tab3"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <div className="grid grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5">
                  <DisplayParam label="Q" value={filterValue?.q}/>
                  <DisplayParam label="R" value={filterValue?.r}/>
                  <DisplayParam label="Alpha" value={filterValue?.alpha}/>
                </div>
              </TabsContent>
              <TabsContent
                value="tab4"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <div className="justify-items-center bg-gray-900 rounded-md gap-5 py-5">
                  <Rtc/>
                </div>
              </TabsContent>
            </div>
        </Tabs>
    </div>
  )
}

export default ConfigView