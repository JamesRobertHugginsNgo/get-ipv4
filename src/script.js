/* BOILERPLATE */

import { networkInterfaces } from 'node:os';

export default function getIpv4() {
	const result = [];
	const nets = networkInterfaces();
	for (const name in nets) {
		for (const net of nets[name]) {
			const { family, internal } = net;
			if (internal || family !== 'IPv4') {
				continue;
			}
			result.push(net);
		}
	}
	return result;
}
