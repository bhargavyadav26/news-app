const Api = (country, page=1) => `https://newsapi.org/v2/top-headlines?page=${page}&country=${country}&apiKey=b211a864efdd47a7b131e88f0008ace7`;

export default Api;