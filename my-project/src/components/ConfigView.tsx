import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/Tabs";
import {Rtc} from "@/components/Rtc"
import DisplayParam from "./DisplayParam";
import { Button } from "./Button";
import { useState } from 'react';
import { ConfigParams } from '@/types/ConfigParams';

function ConfigView() {

    const [params, setParams] = useState<ConfigParams>({
        setPoint:2.5,
        finalSetPoint:2.5,
        riseTime:2.5,
        kp:2.5,
        ki:2.5,
        kd:2.5,
        q:2.5,
        r:2.5,
        beta:2.5
    })

  return (
    <div>        
        <Tabs defaultValue="tab1">
            <div className="flex justify-center">
              <TabsList variant="solid" className="gap-5">
                  <div className="px-3">
                    <TabsTrigger value="tab1">Control</TabsTrigger>
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
                <DisplayParam label="SP" value={params.setPoint}/>
                <DisplayParam label="SP_F" value={params.finalSetPoint}/>
                <DisplayParam label="Time" value={params.riseTime}/>
               </div>
              </TabsContent>
              <TabsContent
                value="tab2"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
               <div className="grid grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5" >
                <DisplayParam label="Kp" value={params.kp}/>
                <DisplayParam label="Ki" value={params.ki}/>
                <DisplayParam label="Kd" value={params.kd}/>
               </div>
              </TabsContent>
              <TabsContent
                value="tab3"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <div className="grid grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5">
                  <DisplayParam label="Q" value={params.q}/>
                  <DisplayParam label="R" value={params.r}/>
                  <DisplayParam label="Beta" value={params.beta}/>
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