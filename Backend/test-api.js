import http from 'http';

const postData = JSON.stringify({
  name: 'Sujith Test',
  email: 'akshumedias@gmail.com',
  phone: '9994627016',
  industry: 'Healthcare',
  message: 'Testing email and WhatsApp integration'
});

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 3001,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

if (process.env.ORIGIN) {
  options.headers.Origin = process.env.ORIGIN;
}

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    if (process.env.ORIGIN) {
      console.log('CORS:', res.headers['access-control-allow-origin'] || 'missing');
    }
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
