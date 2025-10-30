# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**DFP Connect** is a website renewal project for 장애와가족플랫폼 사회적협동조합 (Disability and Family Platform Social Cooperative). The goal is to transform the current information-based website into a dynamic **Digital Hub** that serves three core personas:

1. **Families with disabilities** (B2C) - Service users seeking care, counseling, education
2. **B2B customers** - Partner institutions, centers, schools needing professional services
3. **Supporters/Partners** - Organizations and individuals interested in sponsorship and collaboration

## Project Context

This is a greenfield website development project. The PRD (prd.md) defines the strategic direction:

- **Current state**: Fragmented information board with announcements, galleries, and basic info
- **Target state**: Persona-driven digital hub with customized experiences for each user type
- **Core services**: Emergency care, after-school home tutoring, family counseling, customized travel, professional staffing services

## Development Guidelines

### Language and Localization
- Primary language: Korean (한국어)
- All user-facing content, UI labels, and documentation should be in Korean
- Variable names and code comments can be in English for maintainability

### Key User Flows to Support

**For Families (서비스 이용자):**
- Emergency care requests (긴급돌봄)
- After-school home tutoring booking (방과후 홈티)
- Individual/family counseling (개별/가족 상담)
- Customized travel planning (맞춤형 여행)
- Community stories and experiences (장애인가족 이야기)

**For B2B Customers (협력 기관):**
- Professional staffing requests (전문인력 파견)
- Service inquiries and proposals
- Partnership opportunities

**For Supporters (후원 파트너):**
- Donation/sponsorship information
- Impact stories and transparency reporting
- Collaboration opportunities

### Architecture Considerations

When implementing this project, consider:

1. **Persona-based routing**: Clear navigation paths for each of the three user types
2. **Content management**: System for managing announcements, galleries, stories, and service information
3. **Contact/inquiry forms**: Differentiated forms for service requests, B2B inquiries, and partnership proposals
4. **Responsive design**: Mobile-first approach for families accessing on-the-go
5. **Accessibility**: Critical given the target audience - ensure WCAG compliance

## Deployment

The `.vscode-upload.json` file indicates deployment will be via SSH to a remote server. Connection details are configured but credentials are not committed to the repository (as expected).

## References

- **PRD**: See `prd.md` for complete product requirements in Korean
- Document version: 1.0 (as of 2025-10-30)
