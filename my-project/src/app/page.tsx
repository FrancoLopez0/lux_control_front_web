"use client"

import { Card } from "@/components/Card";
import { LuxAreaChart } from "@/components/LuxAreaChart";
import ParamView from "@/components/ParamView";

import { WebSocketProvider } from "@/providers/WebSocketProvider";

export default function Home() {

  return (
    <div className="h-full flex justify-center ">
      <WebSocketProvider>
        {/* <div className="flex justify-between gap-5 p-5 light:bg-blue-200">
          <ParamView></ParamView>
          <div className="w-2/3">
            {/* <Card className="h-full grid p-10">
              <LuxAreaChart/>
            </Card> 
          </div>
        </div> */}
        <div>
          <ParamView/>
          {/* <LuxAreaChart></LuxAreaChart> */}
        </div>
      </WebSocketProvider>

      {/* <footer className="flex justify-center text-xs">
        <a href="https://www.flaticon.es/iconos-gratis/bulbo-llevado" title="bulbo llevado iconos">Bulbo llevado iconos creados por Flat Icons - Flaticon</a>
      </footer> */}
    </div>
  );
}
