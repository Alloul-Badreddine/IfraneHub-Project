// reviewService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReview = async (userId: string, listingId: string, rating: number, comment: string) => {
  const review = await prisma.review.create({
    data: {
      userId,
      listingId,
      rating,
      comment,
    },
  });

  return review;
};

export const getReviewsForListing = async (listingId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      listingId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return reviews;
  
};

export const closePrismaConnection = () => {
  prisma.$disconnect();
};
