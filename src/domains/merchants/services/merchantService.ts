import { apiClient } from '@/lib/api-client'

const ENDPOINT = '/api/merchants'

export const getMerchants = (page: number, limit: number, token: string) =>
  apiClient.get<any>(`${ENDPOINT}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const patchMerchantStatus = (id: number, status: 'ACTIVE' | 'INACTIVE', token: string) =>
  apiClient.patch(`${ENDPOINT}/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteMerchant = (id: number, token: string) =>
  apiClient.delete(`${ENDPOINT}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const downloadMerchantsCSV = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}${ENDPOINT}/report`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.blob()
}

export async function getDepartments() {
  // Simulación, reemplazar con fetch real
  return [
    { id: 'amazonas', name: 'Amazonas' },
    { id: 'antioquia', name: 'Antioquia' },
  ];
}

export async function getCities(departmentId: string) {
  // Simulación, reemplazar con fetch real
  if (departmentId === 'amazonas') return [{ id: 'alcala', name: 'Alcalá' }];
  if (departmentId === 'antioquia') return [{ id: 'medellin', name: 'Medellín' }];
  return [];
}

export async function createMerchant(data: any, token?: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/merchants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || 'Error al crear comerciante');
  }
  return await res.json();
}

export async function updateMerchant(id: string, data: any) {
  // Reemplazar con PUT real
  return Promise.resolve({ success: true });
}

export async function getMerchantEstablishments(merchantId: string) {
  // Simulación, reemplazar con fetch real
  return {
    totalIncome: 100000000000,
    totalEmployees: 999,
  };
}

export async function getMerchantById(id: string) {
  // Simulación, reemplazar con fetch real
  return {
    id,
    name: 'Empresa 1',
    department: 'amazonas',
    city: 'alcala',
    phone: '1234567',
    email: 'empresa1@email.com',
    registrationDate: '2024-05-08',
    status: 'activo',
    hasEstablishments: true,
  };
}

export async function getMunicipalities(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/municipalities`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener municipios');
  const result = await res.json();
  return result.data.data; // Array de municipios
}

export async function getEstablishments(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/establishments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener establecimientos');
  const result = await res.json();
  return result.data; // Array de establecimientos
} 