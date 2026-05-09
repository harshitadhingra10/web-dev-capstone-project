import axios from 'axios'

// Using free API - no API key needed!
const API_BASE_URL = 'https://restcountries.com/v3.1'

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all?fields=name,capital,flags,population,region`)
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Bonus: Search countries by name
export const searchCountries = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${query}`)
    return response.data
  } catch (error) {
    return [] // Return empty if not found
  }
}