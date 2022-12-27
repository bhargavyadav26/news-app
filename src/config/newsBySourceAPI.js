const Api = (source, page=1) => `https://newsapi.org/v2/top-headlines?page=${page}&sources=${source}&apiKey=b211a864efdd47a7b131e88f0008ace7`;

export default Api;