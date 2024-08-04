const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid'); // Install uuid library with npm install uuid
const base64 = require('base-64'); // Install base-64 library with npm install base-64

// Function to create a JSON object and send a POST request
async function createFile(context) {
  const { name, message } = context.params;

  // 1. Create a JSON from name, message, and current date
  const currentDate = new Date().toISOString();
  const jsonObject = {
    name: name,
    message: message,
    date: currentDate
  };

  // 2. Calculate Base64 encoded value for JSON
  const jsonString = JSON.stringify(jsonObject);
  const base64Encoded = base64.encode(jsonString);

  // 3. Create a random UUID
  const uuid = uuidv4();

  // 4. Create a POST request
  const url = `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPOSITORY/contents/_data/comments/${uuid}.json`;
  const token = 'YOUR_GITHUB_TOKEN'; // Replace with your actual GitHub token

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Add new file',
      content: base64Encoded,
      branch: 'main'
    })
  });

  // Check the response
  if (response.ok) {
    console.log('File created successfully!');
    const responseData = await response.json();
    console.log(responseData);
  } else {
    console.error('Error creating file:', response.status, response.statusText);
    const errorData = await response.json();
    console.error(errorData);
  }
}

// Example context for testing
const context = {
  params: {
    name: 'exampleName',
    message: 'exampleMessage'
  }
};

// Run the function
createFile(context);
