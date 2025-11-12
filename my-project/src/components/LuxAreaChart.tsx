"use client"

import React, { useEffect } from "react"

import { AreaChart } from "@/components/AreaChart"
import { Button } from "./Button";
import axios from "axios";
import { useState } from "react";

class FixedSizeQueue<T> {
  private items: T[] = [];
  private readonly maxSize: number;

  /**
   * @param maxSize El número máximo de elementos que puede contener la cola.
   */
  constructor(maxSize: number) {
    if (maxSize <= 0) {
      throw new Error("El tamaño máximo debe ser un número positivo.");
    }
    this.maxSize = maxSize;
  }

  /**
   * Agrega un elemento a la cola. 
   * Si está llena, remueve el elemento más antiguo (FIFO) antes de agregarlo.
   * @param element El elemento a agregar.
   */
  public enqueue(element: T): void {
    // 1. Verificar si la cola está llena
    if (this.items.length === this.maxSize) {
      // 2. Si está llena, eliminar el primer elemento (el más antiguo - FIFO)
      this.items.shift();
    }
    // 3. Agregar el nuevo elemento al final
    this.items.push(element);
  }

  /**
   * Elimina y devuelve el elemento más antiguo de la cola.
   * @returns El elemento más antiguo, o undefined si la cola está vacía.
   */
  public dequeue(): T | undefined {
    return this.items.shift();
  }

  /**
   * Devuelve una copia del contenido actual de la cola.
   * @returns Un array con todos los elementos de la cola.
   */
  public toArray(): T[] {
    return [...this.items];
  }

  /**
   * Devuelve el número actual de elementos en la cola.
   */
  public get size(): number {
    return this.items.length;
  }

  /**
   * Devuelve el tamaño máximo de la cola.
   */
  public get capacity(): number {
    return this.maxSize;
  }
}

interface UserLog{
  log:number
  lux:number
  time:string
}

interface Response{
  logs:Array<UserLog>,
  status:string
}

const http = axios.create({ baseURL: 'http://localhost:8000/' });

export const LuxAreaChart = () => {
  const types: Array<"lux" | "control" | "percent"> = [
    "lux",
    "control",
  ]

  const [luxValues, setLuxValues] = useState<Array<UserLog>>([{log:0,lux:0,time:"no time"}])

  const onGetLogs = async () => {
    try {
      const r = await http.get<Response>('/logs');
      console.log(r)
      setLuxValues(r.data.logs)
      console.log(luxValues)
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    onGetLogs()
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <Button onClick={onGetLogs} variant="secondary">Update</Button>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-4">
          <p className="mx-auto font-mono text-sm font-medium">Lux</p>
          <AreaChart
            type="default"
            className="h-52 w-200"
            data={luxValues}
            index="time"
            categories={["lux"]}
            showLegend={false}
            />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-4">
          <p className="mx-auto font-mono text-sm font-medium">PID</p>
          <AreaChart
            type="default"
            className="h-52 w-200"
            data={luxValues}
            index="time"
            categories={["lux"]}
            showLegend={false}
            />
        </div>
      </div>
      {/* {types.map((type, index) => (
        <div key={index} className="flex justify-center">
        <div key={index} className="flex flex-col gap-4">
          <p className="mx-auto font-mono text-sm font-medium">{type}</p>
          <AreaChart
            key={index}
            type="default"
            className="h-52 w-200"
            data={chartdata}
            index="time"
            categories={["lux"]}
            showLegend={false}
            />
        </div>
            </div>
      ))} */}
    </div>
  )
}