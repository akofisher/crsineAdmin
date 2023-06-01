const api = {
  fetchData: async (url, options = {}) => {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error:', error)
      throw new Error('An error occurred while fetching the data')
    }
  },
}

export default api
