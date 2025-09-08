import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

// Simple utility to get file extension
const getExtension = (filename: string) => {
  return filename.split('.').pop();
};

// Validate file type
const isValidFileType = (fileType: string, allowedTypes: string[]) => {
  return allowedTypes.includes(fileType.toLowerCase());
};

// Handle file upload
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse form data with file
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('fileType') as string; // 'video', 'audio', 'image'
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Check file size (limit to 100MB for example)
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds limit (100MB)' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const filename = file.name.toLowerCase();
    const extension = getExtension(filename);
    
    let allowedTypes: string[] = [];
    let uploadDir = '';
    
    switch (fileType) {
      case 'video':
        allowedTypes = ['mp4', 'webm', 'mov'];
        uploadDir = 'videos';
        break;
      case 'audio':
        allowedTypes = ['mp3', 'wav', 'ogg'];
        uploadDir = 'podcasts';
        break;
      case 'image':
        allowedTypes = ['jpg', 'jpeg', 'png', 'webp'];
        uploadDir = 'images';
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid file type' },
          { status: 400 }
        );
    }
    
    if (!extension || !isValidFileType(extension, allowedTypes)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Create unique filename
    const uniqueFilename = `${uuidv4()}.${extension}`;
    
    // Define save path
    const publicDir = join(process.cwd(), 'public');
    const uploadPath = join(publicDir, uploadDir);
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadPath)) {
      await mkdir(uploadPath, { recursive: true });
    }
    
    const filePath = join(uploadPath, uniqueFilename);
    
    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    
    // Return the path to the saved file (relative to /public)
    const fileUrl = `/${uploadDir}/${uniqueFilename}`;
    
    return NextResponse.json({ 
      url: fileUrl,
      filename: uniqueFilename,
      originalFilename: file.name,
      mimeType: file.type,
      size: file.size
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');
    const fileType = searchParams.get('fileType'); // 'video', 'audio', 'image'

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: 'File name and type are required' },
        { status: 400 }
      );
    }

    // Generate the local file URL based on file type
    let uploadDir = '';
    switch (fileType) {
      case 'video':
        uploadDir = 'videos';
        break;
      case 'audio':
        uploadDir = 'podcasts';
        break;
      case 'image':
        uploadDir = 'images';
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid file type' },
          { status: 400 }
        );
    }

    // Check if file exists
    const publicDir = join(process.cwd(), 'public');
    const filePath = join(publicDir, uploadDir, fileName);
    
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Return the local file URL
    const url = `/${uploadDir}/${fileName}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Get URL error:', error);
    return NextResponse.json(
      { error: 'Failed to get file URL' },
      { status: 500 }
    );
  }
} 