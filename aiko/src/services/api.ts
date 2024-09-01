// src/services/api.ts
export const fetchData = async (url: string) => {
  try {
      const response = await fetch(url);  // Faz a requisição para o arquivo JSON
      if (!response.ok) {  // Verifica se a resposta foi bem-sucedida
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      return await response.json();  // Converte a resposta para JSON
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
};