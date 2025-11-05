"use client"

import React from 'react'
import { Label } from "./Label";
import { Switch } from "./Switch";
import Led from "@/assets/led.png";
import Image from "next/image";
import { ProgressCircle } from "@/components/ProgressCircle";
import DisplayMainParam from "./DisplayMainParam";
import { useState } from 'react';
import { useWebSocketData } from '@/providers/WebSocketProvider';

const circleSetStyle = (lux:number|undefined,max:number|undefined,min:number|undefined)=>{

    if(!lux || !max || !min) return "default"

    if(lux>=max) return "error"
    if(lux<=min) return "success"
    return "default"
} 

function LuxViewer() {
  
    const [controlState,setControlState] = useState<boolean>(false)
    const {userParams, luxValue} = useWebSocketData()
  
    return (
            <div>
                <div className="flex flex-col gap-5">
                <div className="flex justify-between gap-5">
                    <DisplayMainParam value={userParams?.min} label="Min" size="small"/>
                    <DisplayMainParam value={userParams?.max} label="Max" size="small"/>
                </div>
                <div className="flex justify-center">
                    <ProgressCircle radius={100} strokeWidth={5} max={1500} value={userParams?.setPoint} >
                        <ProgressCircle radius={85} strokeWidth={10} max={1500} value={luxValue?.lux} variant={circleSetStyle(luxValue?.lux,userParams?.max,userParams?.min)}>
                            <div className="justify-center gap-2 items-center">
                                {/* <p className="">LUX</p> */}
                                <div>
                                <Image src={Led} width={100} alt="" className={controlState?"":"off-filter"}></Image>
                                </div>
                                <div className="flex justify-center">
                                <p>
                                    LUX: {luxValue?.lux}
                                </p>
                                {/* <Badge className="flex justify-center w-15"><p>Active</p></Badge> */}
                                </div>
                            </div>
                        </ProgressCircle>
                    </ProgressCircle>
                </div>

                <div className="flex justify-center">
                  <div className="flex justify-center items-center ">
                    <Switch id="sw_control" checked={controlState} onClick={()=>setControlState(!controlState)}></Switch>
                    <Label htmlFor="sw_control">Control</Label>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    <DisplayMainParam value={userParams?.setPoint} label="Set point"/>
                    <DisplayMainParam value={userParams?.riseTime} label="Rise time"/>
                    <DisplayMainParam value={userParams?.setPointFinal} label="Final set point"/>
                </div>
          </div>
    </div>
  )
}

export default LuxViewer