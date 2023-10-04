//GET ALL COMMENTS
import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const x = new URL(req.url);
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get('postSlug');
  console.log(postSlug);
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postSlug: postSlug,
      },
      include: { user: true },
    });
    console.log(comments);
    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }, { status: 500 }));
  }
};

//POST A COMMENT

export const POST = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'Not Authenticated!' }, { status: 401 }));
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });
    return new NextResponse(JSON.stringify(comment, { status: 201 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }, { status: 500 }));
  }
};
