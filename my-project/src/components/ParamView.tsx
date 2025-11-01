"use client"

import { Card } from "@/components/Card";
import { Input } from "./Input";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"

import LuxViewer from "./LuxViewer";
import ConfigView from "./ConfigView";

function ParamView() {
    const data: Array<{
        id: number
        name:string
        value:number
    }> = [
        {
            id:1,
            name:"Kp",
            value:1000
        },
        {
            id:2,
            name:"Ki",
            value:1000
        },
        {   
            id:3,
            name:"Kd",
            value:1000
        }
    ]

  return (
    <div className="w-1/3">

        <Card className="flex justify-center">
          <LuxViewer/>
        </Card>
        <div className="pt-5">
            <Card className="p-10">
                <ConfigView/>
            </Card>
        </div>
    </div>
  )
}

export default ParamView