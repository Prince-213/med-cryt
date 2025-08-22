# Medical Data Encryption Portal

<img width="1919" height="1079" alt="Screenshot 2025-02-25 111851" src="https://github.com/user-attachments/assets/fabf32af-2075-45a6-86b6-6a7a112fbb6c" />


## Overview

A secure Next.js web application designed to protect patient medical data through encryption. This system ensures that medical information remains confidential and can only be accessed when patients provide their decryption keys to healthcare providers.

## Key Features

- 🔒 **End-to-End Encryption**: Patient medical data is encrypted before storage
- 🔑 **Patient-Controlled Access**: Only patients hold the decryption keys
- 🏥 **Secure Medical Portal**: Hospitals can request access to medical records
- ⚡ **Real-time Decryption**: Instant data access when keys are provided
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with preferred database
- **Encryption**: Crypto library for secure data encryption
- **Authentication**: Secure session management
- **Development**: ESLint, PostCSS, and modern tooling


## How It Works

### Encryption Process
1. Patient medical data is encrypted using strong encryption algorithms
2. Encryption keys are generated uniquely for each patient
3. Only encrypted data is stored in the hospital's database
4. Encryption keys are securely provided to patients

### Decryption Process
1. Patients provide their decryption key to healthcare providers
2. System uses the key to decrypt medical data in real-time
3. Decrypted data is displayed temporarily for medical purposes
4. Data remains encrypted in storage at all times

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- pnpm package manager
- Database system (PostgreSQL, MySQL, or SQLite)

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd medical-encryption-portal
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="your_database_connection_string"

# Encryption (generate secure keys)
ENCRYPTION_SECRET="your_encryption_secret_key"

# Next.js
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
pnpm prisma generate
pnpm prisma db push
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Patients:
1. Register and receive your encryption key
2. Upload medical documents and records
3. Provide your key to healthcare providers when needed
4. Maintain control over who accesses your data

### For Healthcare Providers:
1. Request access to patient records
2. Receive decryption keys from patients
3. View decrypted medical information temporarily
4. Never store decrypted data

## Security Features

- **Zero-Knowledge Architecture**: Hospital cannot access data without patient keys
- **End-to-End Encryption**: Data encrypted before leaving the patient's device
- **Secure Key Exchange**: Keys are transmitted through secure channels
- **Temporary Decryption**: Data is only decrypted in memory during viewing sessions
- **Audit Logs**: All access attempts are logged for security review

## Compliance

This system is designed to help healthcare providers meet compliance requirements including:
- HIPAA (Health Insurance Portability and Accountability Act)
- GDPR (General Data Protection Regulation)
- Other regional healthcare data protection regulations

## Development

### Adding New Features
1. Follow TypeScript best practices
2. Maintain encryption protocols throughout
3. Test thoroughly before deployment
4. Update documentation accordingly

### Testing Encryption
Use the test utilities to verify encryption/decryption functionality:
```bash
pnpm test:encryption
```

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the dashboard
3. Deploy automatically on git push

### Self-Hosting
1. Build the application: `pnpm build`
2. Start production server: `pnpm start`
3. Configure reverse proxy and SSL certificates

## Important Security Notes

- 🔐 Never store encryption keys in the database
- 🔐 Ensure proper key management practices
- 🔐 Use HTTPS in production environments
- 🔐 Regularly update dependencies for security patches
- 🔐 Conduct security audits periodically

## Support

For technical issues:
1. Check the console for error messages
2. Verify encryption key configuration
3. Ensure database connection is working
4. Consult the documentation for encryption protocols

## License

This project is licensed under the MIT License. Healthcare providers should ensure compliance with local regulations before use in production environments.

---

**Disclaimer**: This application provides encryption tools but ultimate responsibility for patient data security lies with the healthcare provider implementing this solution. Always consult with legal and compliance experts when handling medical data.
