import { networkInterfaces, NetworkInterfaceInfo } from 'node:os';

export function getIpFamily(family): NetworkInterfaceInfo[] {
	const result: NetworkInterfaceInfo[] = [];
	const nets = networkInterfaces();
	for (const name in nets) {
		if (!nets[name]) {
			continue;
		}
		for (const net of nets[name]) {
			const { family: netFamily, internal } = net;
			if (internal || netFamily !== family) {
				continue;
			}
			result.push(net);
		}
	}
	return result;
}

export default function getIpv4(): NetworkInterfaceInfo[] {
	return getIpFamily('IPv4');
}
