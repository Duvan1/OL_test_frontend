import React from 'react';

export default function MerchantFooter({ totalIncome, totalEmployees, isSubmitting }: { totalIncome: number, totalEmployees: number, isSubmitting: boolean }) {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-blue-900 text-white flex items-center justify-between px-12 py-4 z-50">
      <div>
        <span className="font-semibold">Total Ingresos Formulario: </span>
        <span className="text-2xl font-bold">${totalIncome.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</span>
      </div>
      <div>
        <span className="font-semibold">Cantidad de empleados: </span>
        <span className="text-2xl font-bold">{totalEmployees}</span>
      </div>
      <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg ml-8" disabled={isSubmitting}>
        Enviar Formulario
      </button>
    </footer>
  );
} 