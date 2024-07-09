async function createFileOnGitHub() {
  const url = `https://api.github.com/repos/daniielp/test-security/contents/hello-world.md`;
  const body = {
    message: "this is a test lol",
    content: Buffer.from("Hello!").toString('base64'), // GitHub API expects content to be base64 encoded
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API responded with ${response.status}: ${error}`);
  }

  const responseData = await response.json();
  console.log('File created successfully:', responseData.content.path);
}

createFileOnGitHub()
  .then(() => console.log('File creation process completed.'))
  .catch(error => console.error('Failed to create file:', error));
