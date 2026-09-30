import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import minioClient, { MINIO_BUCKET } from '@/lib/minio'
import { v4 as uuidv4 } from 'uuid'

// Ensure bucket exists
async function ensureBucket() {
  try {
    const exists = await minioClient.bucketExists(MINIO_BUCKET)
    if (!exists) {
      await minioClient.makeBucket(MINIO_BUCKET, 'us-east-1')
      // Set bucket policy to public read
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${MINIO_BUCKET}/*`],
          },
        ],
      }
      await minioClient.setBucketPolicy(MINIO_BUCKET, JSON.stringify(policy))
    }
  } catch (error) {
    console.error('Bucket setup error:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and videos are allowed.' },
        { status: 400 }
      )
    }

    // Ensure bucket exists
    await ensureBucket()

    // Generate unique filename
    const ext = file.name.split('.').pop()
    const filename = `${uuidv4()}.${ext}`
    const type = file.type.startsWith('image/') ? 'image' : 'video'
    const folder = type === 'image' ? 'images' : 'videos'
    const objectName = `${folder}/${filename}`

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to MinIO
    await minioClient.putObject(MINIO_BUCKET, objectName, buffer, buffer.length, {
      'Content-Type': file.type,
    })

    // Generate URL
    const url = `${process.env.NEXT_PUBLIC_MINIO_ENDPOINT}/${MINIO_BUCKET}/${objectName}`

    return NextResponse.json({
      url,
      filename: objectName,
      type,
      size: file.size,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
