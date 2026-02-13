# Incident Response Protocol (AI-SPM)

## 1. Overview
This protocol utilizes the implemented AI Security Posture Management (AI-SPM) system to detect, analyze, and respond to threats in real-time.

## 2. Severity Levels

| Level | Indicator | Behavior | Response |
| :--- | :--- | :--- | :--- |
| **SAFE** | Normal Traffic | Standard user interaction flow. | Passive Monitoring. |
| **SUSPICIOUS** | High Velocity | > 5 requests / 5 seconds. | Warning Toast displayed. Request blocked. |
| **CRITICAL** | Anomaly Detected | > 10 requests / 5 seconds (DDoS Pattern). | **IMMEDIATE LOCKDOWN**. Session terminated. |

## 3. Automated Response Logic
The Client-Side Experience Agent performs the following:
1.  **Ingestion**: Logs every meaningful user interaction token.
2.  **Analysis**: Computes velocity and checks against heuristic baselines.
3.  **Actuation**:
    - If `Suspicious`: Rejects the promise/action locally.
    - If `Critical`: Dispatches a global event to mount the `SecurityOverlay`, rendering the app unusable to the bad actor.

## 4. Manual Investigation
In a production scenario, the `SecurityAgent` would telemetry these events to a SOC (Security Operations Center).
- **Step 1**: Identify Source IP.
- **Step 2**: Correlate with WAF logs.
- **Step 3**: Permanent IP Ban if confirmed malicious.
