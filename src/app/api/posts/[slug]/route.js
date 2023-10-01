import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

// GET SINGLE POST
// export const GET = async (req, { params }) => {
export const GET = async (req, { params }) => {
  const { slug } = params;
  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },
      include: { user: true },
    });
    console.log(post);
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }, { status: 500 }));
  }
};
