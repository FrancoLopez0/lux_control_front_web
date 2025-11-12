"use client"

import { Card } from "@/components/Card";
import LuxViewer from "./LuxViewer";
import ConfigView from "./ConfigView";
import { useWebSocketData } from "@/providers/WebSocketProvider";


function ParamView() {

    const {userParams} = useWebSocketData()

  return (
    <div className="flex p-10 gap-10 justify-center">
        <div className="">
          <Card className="flex justify-center">
            <LuxViewer user={userParams}/>
          </Card>
        </div>
        <div className="w-2/3">
            <Card className="p-10">
                <ConfigView/>
            </Card>
        </div>
    </div>
  )
}

export default ParamView