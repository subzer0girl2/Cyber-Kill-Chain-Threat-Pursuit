
import { KillChainPhase } from './types';

export const CYBER_KILL_CHAIN: KillChainPhase[] = [
  {
    name: 'Reconnaissance',
    description: 'The attacker gathers information on the target before launching an attack.',
    techniques: [
      { id: 'T1595', name: 'Active Scanning', description: 'Probing victim network infrastructure for open ports and vulnerabilities.' },
      { id: 'T1589', name: 'Gather Victim Identity Information', description: 'Finding employee names, email addresses from public sources.' },
      { id: 'T1592', name: 'Gather Victim Host Information', description: 'Collecting data about specific hosts, like OS versions and running services.' },
      { id: 'T1590', name: 'Gather Victim Network Information', description: 'Discovering details about the internal network, like IP ranges and domain names.' },
    ],
  },
  {
    name: 'Weaponization',
    description: 'The attacker creates a malicious payload to be used against the target.',
    techniques: [
      { id: 'T1566.001', name: 'Spearphishing Attachment', description: 'Creating a malicious file (e.g., PDF, DOCX) to be sent via email.' },
      { id: 'T1608.004', name: 'Drive-by Target', description: 'Compromising a website the target is likely to visit to deliver malware.' },
      { id: 'T1587.001', name: 'Develop Capabilities', description: 'Building custom malware or exploits tailored to the target.' },
      { id: 'T1588.002', name: 'Tool', description: 'Acquiring and modifying open-source hacking tools for the operation.' },
    ],
  },
  {
    name: 'Delivery',
    description: 'The attacker transmits the weaponized payload to the targeted environment.',
    techniques: [
      { id: 'T1566.002', name: 'Spearphishing Link', description: 'Sending an email with a link that directs the user to a malicious site.' },
      { id: 'T1195', name: 'Supply Chain Compromise', description: 'Injecting malicious code into a legitimate software update.' },
      { id: 'T1204.002', name: 'Malicious File', description: 'Tricking a user into opening a malicious file from a removable drive or download.' },
      { id: 'T1189', name: 'Drive-by Compromise', description: 'Exploiting a browser vulnerability when the user visits a compromised website.' },
    ],
  },
  {
    name: 'Exploitation',
    description: 'The malicious payload is triggered, exploiting a vulnerability in the system.',
    techniques: [
      { id: 'T1203', name: 'Exploitation for Client Execution', description: 'Triggering a vulnerability in a client application like a browser or PDF reader.' },
      { id: 'T1134.002', name: 'Create Process with Token', description: 'Abusing user tokens to create processes with higher privileges.' },
      { id: 'T1059.001', name: 'PowerShell', description: 'Using PowerShell to execute malicious commands and scripts on a host.' },
      { id: 'T1211', name: 'Exploitation for Evasion', description: 'Using an exploit to bypass security controls like antivirus.' },
    ],
  },
  {
    name: 'Installation',
    description: 'The malware establishes persistence on the victim\'s machine.',
    techniques: [
      { id: 'T1547.001', name: 'Registry Run Keys / Startup Folder', description: 'Placing malware in startup locations to run on boot.' },
      { id: 'T1574.001', name: 'DLL Search Order Hijacking', description: 'Replacing a legitimate DLL with a malicious one that an application will load.' },
      { id: 'T1053.005', name: 'Scheduled Task/Job', description: 'Creating a scheduled task to run the malware at specific times.' },
      { id: 'T1546.008', name: 'Accessibility Features', description: 'Replacing accessibility binaries (e.g., sticky keys) with a backdoor.' },
    ],
  },
  {
    name: 'Command & Control (C2)',
    description: 'The malware communicates with the attacker\'s servers to receive commands.',
    techniques: [
      { id: 'T1071.001', name: 'Application Layer Protocol: Web Protocols', description: 'Using HTTP/HTTPS traffic to blend in with normal network activity.' },
      { id: 'T1105', name: 'Ingress Tool Transfer', description: 'Downloading additional malicious tools or scripts from the C2 server.' },
      { id: 'T1573.001', name: 'Encrypted Channel: Symmetric Cryptography', description: 'Using encryption to hide C2 communications from network monitoring.' },
      { id: 'T1090.002', name: 'External Proxy', description: 'Routing C2 traffic through compromised external systems to hide the true source.' },
    ],
  },
  {
    name: 'Actions on Objectives',
    description: 'The attacker carries out their ultimate goal, such as data theft or destruction.',
    techniques: [
      { id: 'T1486', name: 'Data Encrypted for Impact', description: 'Encrypting files on the host system for a ransomware attack.' },
      { id: 'T1041', name: 'Exfiltration Over C2 Channel', description: 'Stealing data by sending it back through the established C2 channel.' },
      { id: 'T1565.001', name: 'Data Staging', description: 'Collecting and compressing sensitive files into a single location before exfiltration.' },
      { id: 'T1114.001', name: 'Local Email Collection', description: 'Searching for and stealing emails stored on the local machine.' },
    ],
  },
];
