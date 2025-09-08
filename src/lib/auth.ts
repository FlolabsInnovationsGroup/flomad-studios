import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Extend NextAuth types to include custom properties
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }
  
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('🔍 Authorize called with:', { email: credentials?.email, hasPassword: !!credentials?.password });
        
        if (!credentials) {
          console.log('❌ No credentials provided');
          return null;
        }
        
        try {
          // Find user in database
          console.log('🔍 Looking for user:', credentials.email);
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          
          console.log('👤 User lookup result:', user ? `Found user ${user.email}` : 'Not found');
          
          if (!user) {
            console.log('❌ No user found with email:', credentials.email);
            return null;
          }
          
          // Check password (for now, direct comparison - in production use bcrypt)
          const isValidPassword = credentials.password === user.password;
          console.log('🔐 Password check:', isValidPassword ? 'Valid' : 'Invalid');
          console.log('Expected:', user.password, 'Received:', credentials.password);
          
          if (!isValidPassword) {
            console.log('❌ Invalid password for user:', credentials.email);
            return null;
          }
          
          console.log('✅ User authenticated successfully:', user.email);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: null,
            role: user.role
          };
        } catch (error) {
          console.error('🚨 Auth error:', error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "mockAuthSecret",
  debug: true, // Enable debug logging
  logger: {
    error(code, metadata) {
      console.error('🚨 NextAuth Error:', code, metadata);
    },
    warn(code) {
      console.warn('⚠️ NextAuth Warning:', code);
    },
    debug(code, metadata) {
      console.log('🐛 NextAuth Debug:', code, metadata);
    }
  },
}; 