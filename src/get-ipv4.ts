import type { NetworkInterfaceInfo } from 'node:os';
import { networkInterfaces } from 'node:os';

export function getIpFamily(family: string): NetworkInterfaceInfo[] {
	const result: NetworkInterfaceInfo[] = [];
	const nets: NodeJS.Dict<NetworkInterfaceInfo[]> = networkInterfaces();
	for (const name in nets) {
		if (!nets[name]) {
			continue;
		}
		for (const net of nets[name]) {
			const { family: netFamily, internal }: NetworkInterfaceInfo = net;
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
