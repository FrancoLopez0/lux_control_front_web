"use client"

import { Card } from "@/components/Card";
import LuxViewer from "./LuxViewer";
import ConfigView from "./ConfigView";
import { useWebSocketData } from "@/providers/WebSocketProvider";


function ParamView() {

    const {userParams} = useWebSocketData()

  return (
    <div className="w-1/3">

        <Card className="flex justify-center">
          <LuxViewer user={userParams}/>
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