import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// Mock users database
const mockUsers = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@flomadstudios.com",
    image: "/images/avatars/admin.jpg",
    role: "ADMIN",
    password: "admin123" // In a real app, use hashed passwords
  },
  {
    id: "user-2",
    name: "Content Creator", 
    email: "creator@flomadstudios.com",
    image: "/images/avatars/creator.jpg",
    role: "INTERN",
    password: "creator123"
  }
];

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
        if (!credentials) return null;
        
        // Find user with matching email and password
        const user = mockUsers.find(
          (user) => 
            user.email === credentials.email && 
            user.password === credentials.password
        );
        
        return user ? {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role
        } : null;
      }
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
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
}; 