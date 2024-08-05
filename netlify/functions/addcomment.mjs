import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import base64 from 'base-64';

export default async (req, context) => {

  if (req.method === "OPTIONS") {
    return new Response(JSON.stringify({ }), {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://kuldeepsidhu.github.io',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      }
    });
  }

  var response = await createComment(req, context);

  return new Response(response, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://kuldeepsidhu.github.io',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    }
  });
};

async function createComment(req, context) {
  const { post } = context.params;

  // 1. Create a JSON from name, message, and current date
  const currentDate = new Date().toISOString();
  const reqBody = await req.json();
  console.log(reqBody);
  const requestBody = JSON.parse(JSON.stringify(reqBody));
  var postUrl = requestBody.postUrl;
  console.log(requestBody);
  postUrl = posturl.substr(0, posturl.length-1).replace('/public-blog/','');
  console.log(postUrl);

  // 2. Calculate Base64 encoded value for JSON
  const jsonString = JSON.stringify(requestBody);
  const base64Encoded = base64.encode(jsonString);
  const commitMessage = `New comment from ${requestBody.name}`;

  // 3. Create a random UUID
  const uuid = uuidv4();
  const username = Netlify.env.get("USERNAME");
  const repository = Netlify.env.get("REPOSITORY");
  
  // 4. Create a POST request
  const url = `https://api.github.com/repos/${username}/${repository}/contents/_data/comments/${postUrl}/${uuid}.json`;
  console.log(url);
  // const token = 'YOUR_GITHUB_TOKEN'; // Replace with your actual GitHub token
  const token = Netlify.env.get("GITHUB_TOKEN");

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: commitMessage,
      content: base64Encoded,
      branch: 'main'
    })
  });

  // Check the response
  if (response.ok) {
    var apiresponse = 'Comment added successfully!'
    console.log(apiresponse);
    const responseData = await response.json();
    return apiresponse;
    // console.log(responseData);
  } else {
    console.error('Error creating file:', response.status, response.statusText);
    const errorData = await response.json();
    console.error(errorData);
    return "Error adding comment";
  }
}


export const config = {
  path: "/addcomment/:post"
};
