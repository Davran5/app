# Security Policy

## Supported Versions

The following versions of the project are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our systems seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Do not report security vulnerabilities through public GitHub issues.**

Please report them via email to `security@krantas.uz`.

## Security Pipeline

This repository employs an automated security pipeline to ensure code quality and safety.

### 1. Static Application Security Testing (SAST)
We use **GitHub CodeQL** to perform semantic code analysis on every push and pull request. CodeQL treats code as data, allowing us to find potential vulnerabilities like:
- Cross-Site Scripting (XSS)
- Injection flaws
- Unsafe deserialization
- Hardcoded credentials

### 2. Dynamic Application Security Testing (DAST) - Red Teaming
We use **OWASP ZAP (Zed Attack Proxy)** to simulate attacks on the running application. This "Red Team" automation allows us to:
- Spider the application to find all endpoints.
- Attempt active scanning (in a safe environment) to identify runtime vulnerabilities.
- Check for missing security headers (CSP, HSTS).

### 3. AI Safety
Currently, this application does not integrate with Large Language Models (LLMs).
- **Prompt Injection**: Placeholder tests are configured to alert if LLM libraries (e.g., OpenAI, LangChain) are introduced, ensuring we add specific prompt injection guards before deploying AI features.
