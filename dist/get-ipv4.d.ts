import type { NetworkInterfaceInfo } from 'node:os';
export declare function getIpFamily(family: string): NetworkInterfaceInfo[];
export default function getIpv4(): NetworkInterfaceInfo[];
