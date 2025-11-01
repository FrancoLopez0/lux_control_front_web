"use client"

import React from 'react'
import { Label } from "./Label";
import { Switch } from "./Switch";
import Led from "@/assets/led.png";
import Image from "next/image";
import { ProgressCircle } from "@/components/ProgressCircle";
import DisplayMainParam from "./DisplayMainParam";
import { useState } from 'react';

function LuxViewer() {
  
    const [controlState,setControlState] = useState<boolean>(false)
  
    return (
              <div>

            <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-5">
                <DisplayMainParam value={100} label="Min" size="small"/>
                <DisplayMainParam value={1000} label="Max" size="small"/>
            </div>
            <div className="flex justify-center">
                <ProgressCircle radius={100} strokeWidth={20} max={1500} value={500}>
                <div className="justify-center gap-2 items-center">
                    {/* <p className="">LUX</p> */}
                    <div>
                    <Image src={Led} width={100} alt="" className={controlState?"":"off-filter"}></Image>
                    </div>
                    <div className="flex justify-center">
                    <p>
                        LUX: 1000
                    </p>
                    {/* <Badge className="flex justify-center w-15"><p>Active</p></Badge> */}
                    </div>
                </div>
                </ProgressCircle>
            </div>

            <div className="flex justify-center">
              <div className="flex justify-center items-center ">
                <Switch id="sw_control" checked={controlState} onClick={()=>setControlState(!controlState)}></Switch>
                <Label htmlFor="sw_control">Control</Label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
                <DisplayMainParam value={20} label="Set point"/>
                <DisplayMainParam value={20} label="Final set point"/>
                <DisplayMainParam value={20} label="Rise time"/>
            </div>

          </div>

    </div>
  )
}

export default LuxViewer