// src/components/ThemeProvider.tsx

"use client";

import * as React from "react";
// 1. Importa el componente principal de la librería
import { ThemeProvider as NextThemesProvider } from "next-themes";
// 2. 🔑 CORRECCIÓN: Obtén el tipo directamente desde 'next-themes' o defínelo tú.
// La forma más segura es usar el tipo genérico de React.
import { type ThemeProviderProps } from "next-themes"; // 👈 Usa la ruta principal

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange 
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}