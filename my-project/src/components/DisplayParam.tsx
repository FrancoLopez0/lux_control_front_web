import React from 'react'
import { DisplayParamProps } from '@/types/DsiplayMainParamProps'
import { useState, useEffect } from 'react'
import { Input } from '@/components/Input'
import { forwardRef } from 'react'
import { Button } from './Button'

const DisplayParam = forwardRef<HTMLInputElement, DisplayParamProps>(
    ({ value, label, setValue, size = "default", ...props }, ref) => {
        
        // La lógica de edición es irrelevante para RHF, se mantiene aquí
        const [editMode, setEditMode] = useState<boolean>(false);

        return (
            <div className="grid gap-1 justify-items-center bg-gray-800 w-25 rounded-md">
                <p className="text-2xl pt-5">{label}</p>
                <div 
                    className="text-2xl font-semibold text-gray-900 dark:text-gray-50 p-2" 
                    onClick={() => { setEditMode(!editMode) }}
                >
                    <Input
                        placeholder={value === undefined ? " " : value.toString()}
                        type="number"
                        enableStepper={false}
                        ref={ref} 
                        {...props} 
                    />
                </div>
                {/* <div>
                    <Button variant="secondary">Update</Button>
                </div> */}
            </div>
        );
    }
);
// Nombre para el componente en React Devtools
DisplayParam.displayName = 'DisplayParam'; 

export default DisplayParam;