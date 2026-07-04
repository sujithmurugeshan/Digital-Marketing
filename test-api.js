import http from 'http';

const postData = JSON.stringify({
  name: 'Sujith Test',
  email: 'sujith@akshumedias.com',
  phone: '9994627016',
  message: 'Testing email and WhatsApp integration'
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('Request timeout');
  process.exit(1);
});

req.write(postData);
req.end();
