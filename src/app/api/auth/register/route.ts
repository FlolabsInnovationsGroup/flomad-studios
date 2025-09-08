import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const { email, password, name, adminKey } = await request.json();

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Determine role based on admin key
    let role: Role = Role.INTERN; // Default role for regular users
    
    if (adminKey) {
      // Admin registration requires special key
      if (adminKey !== process.env.ADMIN_REGISTRATION_KEY) {
        return NextResponse.json(
          { message: 'Invalid admin registration key' },
          { status: 403 }
        );
      }
      role = Role.ADMIN;
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }
} 