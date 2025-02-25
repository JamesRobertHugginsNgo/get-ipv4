import { networkInterfaces, NetworkInterfaceInfo } from 'node:os';

export function getIpFamily(family): Array<NetworkInterfaceInfo> {
	const result: Array<NetworkInterfaceInfo> = [];
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

export default function getIpv4(): Array<NetworkInterfaceInfo> {
	return getIpFamily('IPv4');
}
