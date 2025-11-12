"use client"

import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/Tabs";
import {Rtc} from "@/components/Rtc"
import DisplayParam from "./DisplayParam";
import { Button } from "./Button";
import { useWebSocketData } from '@/providers/WebSocketProvider';
import { UserLuxParams } from '@/types/UserLuxParams';
import { PidValue } from '@/types/PidValue';
import { FilterValue } from '@/types/FilterValue';
import { useState } from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';

interface FormUser {
  userParams:UserLuxParams,
  pidValue:PidValue,
  filterValue:FilterValue
}

interface ChangeResponse{
  status:string,
  message?:string
}

const http = axios.create({ baseURL: 'http://localhost:8000/' });

function ConfigView() {

  const {userParams, pidValue, filterValue} = useWebSocketData()
  const { register, handleSubmit, reset } = useForm<FormUser>();

   const changeParams = async (params: FormUser): Promise<FormUser> => {
      try {
        const userParams = await http.post<ChangeResponse>('/params', params);
        const pidParams = await http.post<ChangeResponse>('/pid_params', params.pidValue);
        const filterParams = await http.post<ChangeResponse>('/filter_params', params.filterValue);
        console.log(userParams, pidParams, filterParams)
        // const data = await http.post<ChangeResponse>('/params', params);
        return params;
      } catch (error) {
        // Handle error, e.g., throw new Error('Registration failed');
        throw error; // Re-throw for further handling in the calling code
      }
    };

  const onSubmit: SubmitHandler<FormUser> = (params:FormUser) => {
    changeParams(params)
  };

  const [form, setForm] = useState<FormUser|null>(null)

  useEffect(() => {
        if (userParams && pidValue && filterValue) {
            
            const initialData: FormUser = {
                userParams: userParams,
                pidValue: pidValue,
                filterValue: filterValue
            };
            
            reset(initialData);
            
            console.log("Formulario RHF actualizado con datos del WS.");
        }
    }, [userParams, pidValue, filterValue, reset]);

  return (
    <div className='flex justify-center'>
      <form onSubmit={handleSubmit(onSubmit)}>  
        <div className='grid grid-cols-2 gap-10'>   
          <div className="grid w-100 grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5" >
              <DisplayParam step="0.01" min="0" label="Kp" value={form?.pidValue.kp}{...register("pidValue.kp", {valueAsNumber: true})}/>
              <DisplayParam step="0.01" min="0" label="Ki" value={form?.pidValue.ki}{...register("pidValue.ki", {valueAsNumber: true})}/>
              <DisplayParam step="0.01" min="0" label="Kd" value={form?.pidValue.kd}{...register("pidValue.kd", {valueAsNumber: true})}/>
              <DisplayParam step="0.01" min="0" label="Q" onSubmit={()=>{console.log("Enter")}} value={form?.filterValue.q}{...register("filterValue.q", {valueAsNumber: true})}/>
              <DisplayParam step="0.01" min="0" label="R" value={form?.filterValue.r}{...register("filterValue.r", {valueAsNumber: true})}/>
              <DisplayParam step="0.01" min="0" label="Alpha" value={form?.filterValue.alpha}{...register("filterValue.alpha", {valueAsNumber: true})}/>
          </div>

          <div className="grid w-100 grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5" >
                <DisplayParam step="1" min='0' label="SP" value={form?.userParams.setPoint} {...register("userParams.setPoint", {valueAsNumber: true})}/>
                <DisplayParam step="1" min='0' label="SP_F" value={form?.userParams.setPointFinal} {...register("userParams.setPointFinal", {valueAsNumber: true})}/>
                <DisplayParam step="1" min='0' label="Time" value={form?.userParams.riseTime} {...register("userParams.riseTime", {valueAsNumber: true})}/>
                <DisplayParam step="1" min='0' label="Min" value={form?.userParams.min} {...register("userParams.min", {valueAsNumber: true})}/>
                <DisplayParam step="1" min='0' label="Max" value={form?.userParams.max} {...register("userParams.max", {valueAsNumber: true})}/>
          </div>

          {/* <div className="grid grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5">
                  <DisplayParam step="0.01" min="0" label="Q" onSubmit={()=>{console.log("Enter")}} value={form?.filterValue.q}{...register("filterValue.q", {valueAsNumber: true})}/>
                  <DisplayParam step="0.01" min="0" label="R" value={form?.filterValue.r}{...register("filterValue.r", {valueAsNumber: true})}/>
                  <DisplayParam step="0.01" min="0" label="Alpha" value={form?.filterValue.alpha}{...register("filterValue.alpha", {valueAsNumber: true})}/>
          </div> */}
        </div>
        <div className='flex p-1 mt-4 justify-center gap-2 dark:bg-gray-900 rounded-md'>
          <Button variant="secondary" type='submit'>Save</Button>
          <Button variant="secondary" >Reset</Button>
        </div>
        {/* <Tabs defaultValue="tab1">
            <div className="flex justify-center">
              <TabsList variant="solid" className="gap-5">
                  <div className="px-3">
                    <TabsTrigger value="tab1">Params</TabsTrigger>
                    <TabsTrigger value="tab2">PID</TabsTrigger>
                    <TabsTrigger value="tab3">Filter</TabsTrigger>
                  </div>
              </TabsList>
            </div>
            <div className="ml-2 mt-4">
              <TabsContent
                value="tab1"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
               <div className="grid grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5" >
                <DisplayParam step="1" min='0' label="SP" value={form?.userParams.setPoint} {...register("userParams.setPoint", {valueAsNumber: true})}/>
                <DisplayParam step="1" min='0' label="SP_F" value={form?.userParams.setPointFinal} {...register("userParams.setPointFinal", {valueAsNumber: true})}/>
                <DisplayParam step="1" min='0' label="Time" value={form?.userParams.riseTime} {...register("userParams.riseTime", {valueAsNumber: true})}/>
                <DisplayParam step="1" min='0' label="Min" value={form?.userParams.min} {...register("userParams.min", {valueAsNumber: true})}/>
                <DisplayParam step="1" min='0' label="Max" value={form?.userParams.max} {...register("userParams.max", {valueAsNumber: true})}/>
               </div>
              </TabsContent>
              <TabsContent
                value="tab2"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
               <div className="grid grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5" >
                <DisplayParam step="0.01" min="0" label="Kp" value={form?.pidValue.kp}{...register("pidValue.kp", {valueAsNumber: true})}/>
                <DisplayParam step="0.01" min="0" label="Ki" value={form?.pidValue.ki}{...register("pidValue.ki", {valueAsNumber: true})}/>
                <DisplayParam step="0.01" min="0" label="Kd" value={form?.pidValue.kd}{...register("pidValue.kd", {valueAsNumber: true})}/>
               </div>
              </TabsContent>
              <TabsContent
                value="tab3"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <div className="grid grid-cols-3 justify-items-center bg-gray-900 rounded-md p-5 gap-5">
                  <DisplayParam step="0.01" min="0" label="Q" onSubmit={()=>{console.log("Enter")}} value={form?.filterValue.q}{...register("filterValue.q", {valueAsNumber: true})}/>
                  <DisplayParam step="0.01" min="0" label="R" value={form?.filterValue.r}{...register("filterValue.r", {valueAsNumber: true})}/>
                  <DisplayParam step="0.01" min="0" label="Alpha" value={form?.filterValue.alpha}{...register("filterValue.alpha", {valueAsNumber: true})}/>
                </div>
              </TabsContent>
            </div>
        </Tabs>
        <div className='flex p-1 m-4 justify-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-md'>
          <Button variant="secondary" type='submit'>Save</Button>
          <Button variant="secondary" >Reset</Button>
        </div> */}
        </form>
    </div>
  )
}

export default ConfigView