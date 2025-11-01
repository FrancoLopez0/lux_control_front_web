"use client"

import { Card } from "@/components/Card";
import ParamView from "@/components/ParamView";

export default function Home() {
  return (
    <div className="h-full">
      <div className="flex justify-between gap-5 p-10 bg-blue-200">
        <ParamView></ParamView>
        <div className="w-2/3">
          <Card className="h-full flex justify-center">
            <p>Grafica</p>
          </Card>
        </div>
      </div>
      <footer>
        <a href="https://www.flaticon.es/iconos-gratis/bulbo-llevado" title="bulbo llevado iconos">Bulbo llevado iconos creados por Flat Icons - Flaticon</a>
      </footer>
    </div>
  );
}
