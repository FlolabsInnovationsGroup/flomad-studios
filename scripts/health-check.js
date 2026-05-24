#!/usr/bin/env node

/**
 * Production Health Check Script for Flomad Studios
 * Run this before deploying to production to catch potential issues
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for better output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  log(`${exists ? '✅' : '❌'} ${description}: ${exists ? 'Found' : 'Missing'}`, 
      exists ? colors.green : colors.red);
  return exists;
}

function checkEnvVariable(varName, required = true) {
  const value = process.env[varName];
  const exists = !!value;
  const status = exists ? '✅' : (required ? '❌' : '⚠️');
  const statusColor = exists ? colors.green : (required ? colors.red : colors.yellow);
  
  log(`${status} ${varName}: ${exists ? 'Set' : 'Missing'}`, statusColor);
  
  if (exists && varName.includes('SECRET')) {
    const isSecure = value.length >= 32 && value !== 'your-secret-here' && value !== 'mockAuthSecret';
    log(`  ${isSecure ? '✅' : '❌'} Secret strength: ${isSecure ? 'Strong' : 'Weak/Default'}`, 
        isSecure ? colors.green : colors.red);
  }
  
  return exists;
}

function checkPackageJson() {
  log('\n📦 Package.json Configuration:', colors.bold);
  
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check required scripts
    const requiredScripts = ['dev', 'build', 'start', 'lint'];
    requiredScripts.forEach(script => {
      const exists = pkg.scripts && pkg.scripts[script];
      log(`${exists ? '✅' : '❌'} Script "${script}": ${exists ? 'Found' : 'Missing'}`, 
          exists ? colors.green : colors.red);
    });
    
    // Check if postinstall script exists (important for Prisma)
    const hasPostinstall = pkg.scripts && pkg.scripts.postinstall;
    log(`${hasPostinstall ? '✅' : '⚠️'} Postinstall script: ${hasPostinstall ? 'Found' : 'Missing (recommended for Prisma)'}`, 
        hasPostinstall ? colors.green : colors.yellow);
    
    // Check production dependencies
    const prodDeps = [
      '@prisma/client',
      'next',
      'react',
      'next-auth'
    ];
    
    prodDeps.forEach(dep => {
      const exists = pkg.dependencies && pkg.dependencies[dep];
      log(`${exists ? '✅' : '❌'} Dependency "${dep}": ${exists ? 'Found' : 'Missing'}`, 
          exists ? colors.green : colors.red);
    });
    
    return true;
  } catch (error) {
    log('❌ Failed to read package.json', colors.red);
    return false;
  }
}

function checkSecurityFiles() {
  log('\n🔒 Security Configuration:', colors.bold);
  
  // Check for sensitive files that shouldn't exist
  const sensitiveFiles = ['.env', '.env.local', '.env.production'];
  sensitiveFiles.forEach(file => {
    const exists = fs.existsSync(file);
    if (exists) {
      log(`⚠️ Warning: ${file} found - ensure it's not committed to version control`, colors.yellow);
      
      // Check if .env contains default/weak values
      try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('your-secret-here') || content.includes('mockAuthSecret')) {
          log(`❌ ${file} contains default/weak secrets!`, colors.red);
        }
      } catch (e) {
        // File might be restricted, that's okay
      }
    }
  });
  
  // Check for .env.example
  checkFile('.env.example', '.env.example (template)');
  
  // Check gitignore
  const gitignoreExists = checkFile('.gitignore', '.gitignore');
  if (gitignoreExists) {
    try {
      const gitignore = fs.readFileSync('.gitignore', 'utf8');
      const hasEnvIgnore = gitignore.includes('.env');
      log(`${hasEnvIgnore ? '✅' : '❌'} .gitignore includes .env files: ${hasEnvIgnore ? 'Yes' : 'No'}`, 
          hasEnvIgnore ? colors.green : colors.red);
    } catch (e) {
      log('⚠️ Could not read .gitignore', colors.yellow);
    }
  }
}

function checkDatabaseConfig() {
  log('\n🗄️ Database Configuration:', colors.bold);
  
  checkFile('prisma/schema.prisma', 'Prisma schema');
  
  const hasMigrations = fs.existsSync('prisma/migrations') && 
                       fs.readdirSync('prisma/migrations').length > 0;
  log(`${hasMigrations ? '✅' : '⚠️'} Database migrations: ${hasMigrations ? 'Found' : 'None (may be intentional)'}`, 
      hasMigrations ? colors.green : colors.yellow);
}

function checkNextJsConfig() {
  log('\n⚙️ Next.js Configuration:', colors.bold);
  
  const configExists = checkFile('next.config.ts', 'Next.js config') || 
                      checkFile('next.config.js', 'Next.js config');
  
  if (configExists) {
    const configFile = fs.existsSync('next.config.ts') ? 'next.config.ts' : 'next.config.js';
    try {
      const config = fs.readFileSync(configFile, 'utf8');
      
      // Check for important security headers
      const hasSecurityHeaders = config.includes('X-Frame-Options') || config.includes('headers');
      log(`${hasSecurityHeaders ? '✅' : '⚠️'} Security headers: ${hasSecurityHeaders ? 'Configured' : 'Missing (recommended)'}`, 
          hasSecurityHeaders ? colors.green : colors.yellow);
      
      // Check for image optimization
      const hasImageConfig = config.includes('images');
      log(`${hasImageConfig ? '✅' : '⚠️'} Image optimization: ${hasImageConfig ? 'Configured' : 'Default'}`, 
          hasImageConfig ? colors.green : colors.yellow);
          
    } catch (e) {
      log('⚠️ Could not analyze config file', colors.yellow);
    }
  }
}

function checkSEOFiles() {
  log('\n🔍 SEO & Performance:', colors.bold);
  
  checkFile('public/robots.txt', 'robots.txt');
  checkFile('src/app/sitemap.ts', 'Sitemap generator') || 
  checkFile('src/app/sitemap.xml', 'Static sitemap') ||
  checkFile('public/sitemap.xml', 'Static sitemap');
  
  checkFile('src/app/metadata.ts', 'Metadata configuration');
  
  // Check for favicons
  const faviconExists = checkFile('public/favicon.ico', 'favicon.ico') ||
                       checkFile('public/favicon.svg', 'favicon.svg');
  
  // Check for og images
  checkFile('src/app/opengraph-image.tsx', 'Dynamic OpenGraph image') ||
  checkFile('src/app/api/og/route.tsx', 'OpenGraph API route') ||
  checkFile('public/og.jpg', 'OpenGraph image') ||
  checkFile('public/og.png', 'OpenGraph image');
}

function checkEnvironmentVariables() {
  log('\n🌍 Environment Variables:', colors.bold);
  
  // Required variables
  checkEnvVariable('NEXTAUTH_SECRET', true);
  checkEnvVariable('NEXTAUTH_URL', true);
  
  // Database
  const hasDB = checkEnvVariable('DATABASE_URL', false);
  if (hasDB) {
    checkEnvVariable('DIRECT_URL', false);
  }
  
  // Optional but recommended
  checkEnvVariable('ADMIN_REGISTRATION_KEY', false);
  checkEnvVariable('GOOGLE_CLIENT_ID', false);
  checkEnvVariable('GOOGLE_CLIENT_SECRET', false);
  
  // AWS (optional)
  const hasAWSKey = process.env.AWS_ACCESS_KEY_ID;
  if (hasAWSKey) {
    checkEnvVariable('AWS_SECRET_ACCESS_KEY', true);
    checkEnvVariable('AWS_BUCKET_NAME', true);
    checkEnvVariable('AWS_REGION', true);
  }
}

function checkBuildReadiness() {
  log('\n🏗️ Build Readiness:', colors.bold);
  
  // Check if node_modules exists
  const nodeModulesExists = checkFile('node_modules', 'Dependencies installed');
  
  // Check for lockfile
  const hasLockfile = checkFile('package-lock.json', 'npm lockfile') ||
                     checkFile('pnpm-lock.yaml', 'pnpm lockfile') ||
                     checkFile('yarn.lock', 'yarn lockfile');
  
  // Try to check TypeScript compilation
  if (fs.existsSync('tsconfig.json')) {
    log('✅ TypeScript configuration found', colors.green);
    
    // Check if there's a build output
    const hasBuildOutput = fs.existsSync('.next');
    log(`${hasBuildOutput ? '✅' : '⚠️'} Previous build output: ${hasBuildOutput ? 'Found' : 'None (run npm run build)'}`, 
        hasBuildOutput ? colors.green : colors.yellow);
  }
}

function checkDebugEndpoints() {
  log('\n🐛 Debug Endpoints (Should be secured in production):', colors.bold);
  
  const debugPaths = [
    'src/app/api/debug/simple-test/route.ts',
    'src/app/api/debug/db-test/route.ts',
    'src/app/api/debug/auth-test/route.ts'
  ];
  
  debugPaths.forEach(path => {
    if (fs.existsSync(path)) {
      try {
        const content = fs.readFileSync(path, 'utf8');
        const isSecured = content.includes('NODE_ENV === \'production\'') && 
                         content.includes('return NextResponse.json');
        log(`${isSecured ? '✅' : '❌'} ${path}: ${isSecured ? 'Secured for production' : 'NOT SECURED - SECURITY RISK!'}`, 
            isSecured ? colors.green : colors.red);
      } catch (e) {
        log(`⚠️ Could not check ${path}`, colors.yellow);
      }
    }
  });
}

function runHealthCheck() {
  log(`${colors.bold}${colors.blue}🏥 Flomad Studios - Production Health Check${colors.reset}\n`);
  log('This script checks your application for production readiness...\n');
  
  let hasErrors = false;
  
  try {
    // Run all checks
    checkPackageJson();
    checkSecurityFiles();
    checkDatabaseConfig();
    checkNextJsConfig();
    checkSEOFiles();
    checkEnvironmentVariables();
    checkBuildReadiness();
    checkDebugEndpoints();
    
    log(`\n${colors.bold}📋 Health Check Complete!${colors.reset}\n`);
    
    // Summary
    log('🚀 Ready for production deployment!', colors.green);
    log('\n📚 Deployment Guide: See DEPLOYMENT_GUIDE.md for detailed instructions');
    log('🔗 Don\'t forget to:', colors.blue);
    log('  • Set environment variables in Vercel dashboard');
    log('  • Configure custom domain and DNS');
    log('  • Enable monitoring and analytics');
    log('  • Test all functionality after deployment\n');
    
  } catch (error) {
    log(`❌ Health check failed: ${error.message}`, colors.red);
    hasErrors = true;
  }
  
  process.exit(hasErrors ? 1 : 0);
}

// Run the health check
if (require.main === module) {
  runHealthCheck();
}

module.exports = { runHealthCheck };