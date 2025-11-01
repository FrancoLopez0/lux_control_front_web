"use client"

import { Card } from "@/components/Card";
import { ProgressCircle } from "@/components/ProgressCircle";
import Led from "@/assets/led.png";
import Image from "next/image";

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
import { Switch } from "@radix-ui/react-switch";

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
            <Switch></Switch>
          {/* <p>Parametros</p> */}
          <div className="">
            <ProgressCircle radius={100} strokeWidth={20} max={1500} value={500}>
              <div className="justify-center gap-2 items-center">
                {/* <p className="">LUX</p> */}
                <div>
                  <Image src={Led} width={100} alt="" className="off-filter" ></Image>
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
        </Card>
        <div className="py-5">
            <Card className="p-10">
                <div>
                <TableRoot className="w-2/3">
                    <Table>
                        <TableCaption>Control params</TableCaption>
                        <TableHead>
                            <TableHeaderCell>Param</TableHeaderCell>
                            <TableHeaderCell>Value</TableHeaderCell>
                        </TableHead>
                        <TableBody >
                            {data.map((item)=>(
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableRoot>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default ParamView