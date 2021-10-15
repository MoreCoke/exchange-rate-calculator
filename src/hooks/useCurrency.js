import useFetch from './common/useFetch';

export default function useCurrency(currency) {
  const url = `https://api.exchangerate-api.com/v4/latest/${currency}`;
  return useFetch(url);
}
