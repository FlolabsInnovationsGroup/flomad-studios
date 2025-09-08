// Test the production authentication debug endpoint
async function testProductionAuth() {
  try {
    const response = await fetch('https://flomad-studios.vercel.app/api/debug/auth-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@flomadstudios.com',
        password: 'admin123'
      })
    });
    
    const data = await response.json();
    console.log('Production Auth Test Result:', data);
    return data;
  } catch (error) {
    console.error('Production Auth Test Error:', error);
    return { error: error.message };
  }
}

// Run the test
testProductionAuth().then(result => {
  console.log('Final result:', JSON.stringify(result, null, 2));
});
