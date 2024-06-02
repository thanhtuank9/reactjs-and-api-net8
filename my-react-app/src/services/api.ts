import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5030', // Adjust to your API's URL if different
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get access token from local storage
const getAccessToken = (): string | null => localStorage.getItem('accessToken');

// Function to update access token in local storage
const updateLocalAccessToken = (accessToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
};

// Function to get refresh token from local storage
const getLocalRefreshToken = (): string | null => localStorage.getItem('refreshToken');

// Function to handle redirection to the login page
const redirectToLogin = () => {
  window.location.href = '/login';
};


api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
});
// Function to handle access token expiration and refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {    
    console.log("interceptors Error: " + error);
    const { config, response } = error;
    const originalRequest = config;
    
    if(error.code === 'ERR_NETWORK'){
      return Promise.reject({response: {data: {'status': -1, 'detail' : error.message}}});
    }

    // Ignore the auth/login endpoint
    if (originalRequest.url.indexOf('/auth/login') >= 0) {
      return Promise.reject(error);
    }

    // Access Token was expired
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getLocalRefreshToken();
        if (!refreshToken) {
          // Handle scenario where refresh token is not available
          redirectToLogin();
          return Promise.reject(error);
        }

        const rs = await api.post('/auth/refresh', {
          accessToken: getAccessToken(),
          refreshToken,
        });

        // need to check more with status (TODO)
        if(rs.data.status !== 1){
          return Promise.reject(error);
        }

        const { accessToken } = rs.data.data;
        updateLocalAccessToken(accessToken);
  
        return api(originalRequest);
      } catch (_error) {
        redirectToLogin();
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  }
);

// Export instance for use in other parts of the application
export default api;

interface ApiResponse {
  status: number;
  data: object
}

interface LoginResponse  {
  accessToken: string;
  refreshToken: string;
}

interface CreateProductResponse {
  success: boolean;
  productId: number;
}

interface ErrorResponse {
  status: number; // debpends on api
  detail: string; // message
}

interface Product {
  id: number;
  productName: string;
  quantity: number;
}

interface GetProductsResponse {
  total: number;
  products: Product[];
  pageSize: number;
  pageIndex: number;
}



export const login = async (username: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw (error.response.data as ErrorResponse);
  }
};

export const getProducts = async (keyword: string, pageSize: number, pageIndex: number): Promise<GetProductsResponse> => {
  try {
    const response = await api.get<GetProductsResponse>('/products', {
      params: { keyword, pageSize, pageIndex },
    });
    return response.data;
  } catch (error) {
    throw (error.response.data as ErrorResponse);
  }
};

export const createProduct = async (productName: string, quantity: number): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/products', { productName, quantity });
    return response.data;
  } catch (error) {
    throw (error.response.data as ErrorResponse);
  }
};
