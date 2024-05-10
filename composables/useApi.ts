type useFetchType = typeof useFetch;

export const useApi: useFetchType = (path, options?: {}) => {
  const url = 'https://mc.mydatacoin.io';
  return useFetch(`${url}${path}`, options);
};
