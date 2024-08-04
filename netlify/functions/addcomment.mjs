export default async (req, context) => {
  try {
    // Fetch data from the API
    const data = {};
    data.request.url = req.url;
    data.request.method = req.method;
    data.request.body = req.body;
    data.request.bodyUsed = req.bodyUsed;
    data.context = context;
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
