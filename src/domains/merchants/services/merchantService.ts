import { API_URL } from '@/config/constants';

interface Merchant {
  id?: number;
  name: string;
  document_type: string;
  document_number: string;
  municipality_id: number;
  phone: string;
  email: string;
  registration_date: string;
  status: string;
  hasEstablishments?: boolean;
}

interface PaginationParams {
  page: number;
  limit: number;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }
  return data;
};

export const getMerchants = async (params: PaginationParams, token?: string): Promise<PaginatedResponse<Merchant>> => {
  const { page, limit } = params;
  const response = await fetch(`${API_URL}/merchants?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return handleResponse(response);
};

export const getMerchantById = async (id: number, token?: string): Promise<Merchant> => {
  const response = await fetch(`${API_URL}/merchants/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return handleResponse(response);
};

export const createMerchant = async (merchant: Omit<Merchant, 'id'>, token?: string): Promise<Merchant> => {
  const response = await fetch(`${API_URL}/merchants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(merchant),
  });
  return handleResponse(response);
};

export const updateMerchant = async (id: number, merchant: Merchant, token?: string): Promise<Merchant> => {
  const response = await fetch(`${API_URL}/merchants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(merchant),
  });
  return handleResponse(response);
};

export const deleteMerchant = async (id: number, token?: string): Promise<Merchant> => {
  const response = await fetch(`${API_URL}/merchants/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return handleResponse(response);
};

export const getMunicipalities = async (token?: string): Promise<{ id: number; name: string }[]> => {
  const response = await fetch(`${API_URL}/municipalities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return handleResponse(response);
};

export const patchMerchantStatus = (id: number, status: 'ACTIVE' | 'INACTIVE', token: string) =>
  fetch(`${API_URL}/merchants/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  }).then(handleResponse);

export const downloadMerchantsCSV = async (token: string) => {
  const res = await fetch(`${API_URL}/merchants/report`, {
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

export async function getMerchantEstablishments(merchantId: string) {
  // Simulación, reemplazar con fetch real
  return {
    totalIncome: 100000000000,
    totalEmployees: 999,
  };
}

export async function getEstablishments(token: string) {
  const res = await fetch(`${API_URL}/establishments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener establecimientos');
  const result = await res.json();
  return result.data; // Array de establecimientos
} 