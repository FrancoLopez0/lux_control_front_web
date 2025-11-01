"use client"

import { Card } from "@/components/Card";
import { LuxAreaChart } from "@/components/LuxAreaChart";
import ParamView from "@/components/ParamView";

export default function Home() {
  return (
    <div className="h-full">
      <div className="flex justify-between gap-5 p-10 light:bg-blue-200">
        <ParamView></ParamView>
        <div className="w-2/3">
          <Card className="h-full grid p-10">
            <LuxAreaChart/>
          </Card>
        </div>
      </div>
      <footer className="flex justify-center text-xs">
        <a href="https://www.flaticon.es/iconos-gratis/bulbo-llevado" title="bulbo llevado iconos">Bulbo llevado iconos creados por Flat Icons - Flaticon</a>
      </footer>
    </div>
  );
}
