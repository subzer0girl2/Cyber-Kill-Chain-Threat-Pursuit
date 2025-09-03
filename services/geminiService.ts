
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using fallback scenarios.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const fallbackScenarios: { [key: string]: string } = {
  'Active Scanning': "Alert! We're detecting an unusual number of port scans originating from a single IP address, targeting our external web servers. They seem to be looking for an open door.",
  'Spearphishing Attachment': "A high-priority incident has been flagged. An email sent to the finance department contained a password-protected invoice document. Malware analysis confirms it contains a malicious macro.",
  'Spearphishing Link': "Security logs show multiple employees received emails pretending to be from IT support, with a link to a fake password reset page. It's a credential harvesting attempt.",
  'Exploitation for Client Execution': "We have a confirmed breach. A user opened a compromised PDF, which exploited a known vulnerability in their PDF reader to execute arbitrary code on their machine.",
  'Registry Run Keys / Startup Folder': "Endpoint protection has detected a new entry in the Windows Registry's 'Run' key. It points to an unknown executable in the Temp directory, ensuring it launches on every reboot.",
  'Application Layer Protocol: Web Protocols': "Network traffic analysis shows a compromised workstation making periodic POST requests to an unknown external domain. The traffic is disguised as normal HTTPS, but the data packets are unusual.",
  'Data Encrypted for Impact': "Catastrophic event in progress. File servers are reporting mass file modifications, with extensions being changed to '.locked'. It's a ransomware attack.",
};

export const generateScenario = async (phaseName: string, correctTechnique: string): Promise<string> => {
  if (!API_KEY) {
    return fallbackScenarios[correctTechnique] || `An anomaly has been detected during the ${phaseName} phase. Analysis suggests a hostile actor is attempting to use the ${correctTechnique} technique.`;
  }

  const prompt = `
    You are a creative cybersecurity storyteller for a training game.
    Your task is to create a short, engaging narrative (2-3 sentences) describing a cyber attack in progress, from the perspective of a security analyst monitoring network logs.
    The narrative must subtly describe a specific MITRE ATT&CK technique without explicitly naming it.

    Current Phase of the Cyber Kill Chain: "${phaseName}"
    Technique to describe: "${correctTechnique}"

    Create a tense and realistic narrative that clearly hints at an attacker performing the "${correctTechnique}" technique during the "${phaseName}" phase. Do not use the exact words "${correctTechnique}" or its synonyms.
    For example, if the technique is "Phishing", you could write: "We're seeing a spike in emails to the finance department with suspicious links, disguised as urgent invoices. The sender's domain is slightly misspelled. This looks like a classic lure."
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating scenario:", error);
    return fallbackScenarios[correctTechnique] || "The system is quiet... too quiet. A critical alert flashes on the screen regarding an anomaly, but the details are corrupted. You must choose the most likely threat based on the current attack phase.";
  }
};
