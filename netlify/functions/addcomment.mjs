export default async (req, context) => {
  try {
    // Fetch data from the API
    const response = {};
    response.request = req;
    response.context = context;
    return new Response(JSON.stringify(response), {
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
