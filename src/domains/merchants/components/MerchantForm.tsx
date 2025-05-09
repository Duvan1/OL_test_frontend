'use client'

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getMunicipalities, createMerchant } from '../services/merchantService';
import { useAuthStore } from '@/store/authStore';
import toast, { Toaster } from 'react-hot-toast';

const schema = yup.object().shape({
  name: yup.string().required('La razón social es obligatoria'),
  document_type: yup.string().required('El tipo de documento es obligatorio'),
  document_number: yup.string().required('El número de documento es obligatorio'),
  municipality_id: yup.number().required('La ciudad es obligatoria').typeError('Seleccione una ciudad'),
  phone: yup.string().required('El teléfono es obligatorio').min(7, 'Mínimo 7 dígitos'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  registration_date: yup.date().required('La fecha es obligatoria'),
  status: yup.string().required('El estado es obligatorio'),
});

export default function MerchantForm({ mode = 'create', initialData }: { mode: 'create' | 'edit', initialData?: any }) {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: '',
      document_type: '',
      document_number: '',
      municipality_id: '',
      phone: '',
      email: '',
      registration_date: '',
      status: 'ACTIVE',
    },
  });
  const [cities, setCities] = React.useState<{ id: number; name: string }[]>([]);
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      getMunicipalities(token).then(setCities);
    }
  }, [token]);

  const onSubmit = async (data: any) => {
    console.log('enviando', data);
    try {
      await createMerchant({
        ...data,
        municipality_id: Number(data.municipality_id),
        registration_date: new Date(data.registration_date).toISOString(),
      }, token || undefined);
      toast.success('Comerciante guardado correctamente');
      reset();
    } catch (err: any) {
      toast.error(err?.message || 'Error al guardar el comerciante');
    }
  };

  return (
    <div className="relative">
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)} id="merchant-form" className="bg-white rounded-xl p-8 shadow-md max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Datos Generales</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium mb-1">Nombre *</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input {...field} id="name" className="input border rounded px-3 py-2" />
              )}
            />
            {errors.name && <span className="text-red-500 text-xs">{String(errors.name.message)}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="document_type" className="font-medium mb-1">Tipo de documento *</label>
            <Controller
              name="document_type"
              control={control}
              render={({ field }) => (
                <select {...field} id="document_type" className="input border rounded px-3 py-2">
                  <option value="">Seleccione</option>
                  <option value="NIT">NIT</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                </select>
              )}
            />
            {errors.document_type && <span className="text-red-500 text-xs">{String(errors.document_type.message)}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="document_number" className="font-medium mb-1">Número de documento *</label>
            <Controller
              name="document_number"
              control={control}
              render={({ field }) => (
                <input {...field} id="document_number" className="input border rounded px-3 py-2" />
              )}
            />
            {errors.document_number && <span className="text-red-500 text-xs">{String(errors.document_number.message)}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="municipality_id" className="font-medium mb-1">Ciudad *</label>
            <Controller
              name="municipality_id"
              control={control}
              render={({ field }) => (
                <select {...field} id="municipality_id" className="input border rounded px-3 py-2">
                  <option value="">Seleccione</option>
                  {cities.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              )}
            />
            {errors.municipality_id && <span className="text-red-500 text-xs">{String(errors.municipality_id.message)}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-medium mb-1">Teléfono</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <input {...field} id="phone" className="input border rounded px-3 py-2" />
              )}
            />
            {errors.phone && <span className="text-red-500 text-xs">{String(errors.phone.message)}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium mb-1">Correo electrónico</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input {...field} id="email" className="input border rounded px-3 py-2" />
              )}
            />
            {errors.email && <span className="text-red-500 text-xs">{String(errors.email.message)}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="registration_date" className="font-medium mb-1">Fecha de registro *</label>
            <Controller
              name="registration_date"
              control={control}
              render={({ field }) => (
                <input {...field} id="registration_date" type="date" className="input border rounded px-3 py-2" />
              )}
            />
            {errors.registration_date && <span className="text-red-500 text-xs">{String(errors.registration_date.message)}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="status" className="font-medium mb-1">Estado *</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select {...field} id="status" className="input border rounded px-3 py-2">
                  <option value="ACTIVE">Activo</option>
                  <option value="INACTIVE">Inactivo</option>
                </select>
              )}
            />
            {errors.status && <span className="text-red-500 text-xs">{String(errors.status.message)}</span>}
          </div>
        </div>
        <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-end px-12 py-4 z-50">
          <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg" disabled={isSubmitting}>
            Enviar Formulario
          </button>
        </footer>
      </form>
    </div>
  );
} 