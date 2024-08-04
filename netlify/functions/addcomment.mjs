export default async (req, context) => {
  try {
    // Fetch data from the API
    const data = {};
    data.url = req.url;
    data.method = req.method;
    data.body = req.body;
    data.bodyUsed = req.bodyUsed;
    data.context = context;

    // Parse the request body
    const requestBody = JSON.parse(req);
    data.parsedBody = requestBody;

    
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
