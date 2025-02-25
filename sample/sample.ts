import { createServer, IncomingMessage } from 'node:http';

import getIpv4 from '../dist/get-ipv4';

const PORT = 3000;
const SCHEME = 'http';

const server = createServer();

server.on('error', (error) => {
	console.error(error);
});

server.on('request', (request, response) => {
	const body: Array<Buffer> = [];
	request
		.on('error', (error) => {
			console.error(error);
			console.log('BODY', Buffer.concat(body).toString());
			response.setHeader('content-type', 'text/plain');
			response.setHeader('content-language', 'en-CA');
			response.writeHead(500);
			response.write('500 Internal Server Error');
			response.end();
		})
		.on('data', (chunk: Buffer) => {
			body.push(chunk);
		})
		.on('end', () => {
			console.log('BODY', Buffer.concat(body).toString());
			response.setHeader('content-type', 'text/plain');
			response.setHeader('content-language', 'en-CA');
			response.writeHead(200);
			response.write('200 OK');
			response.end();
		});
});

server.listen(PORT, () => {
	console.group(`Server listening on port ${PORT}`);
	console.log(`${SCHEME}://localhost:${PORT}/`);
	for (const { address } of getIpv4()) {
		console.log(`${SCHEME}://${address}:${PORT}/`);
	}
	console.groupEnd();
	console.log();
})
