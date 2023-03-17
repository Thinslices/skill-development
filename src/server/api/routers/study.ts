import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { prisma } from '../../db';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const studyRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const study = await prisma.study.findUnique({
        where: input,
        include: {
          questions: {
            orderBy: {
              index: 'asc',
            },
          },
          User: true,
        },
      });
      return study;
    }),

  getAll: protectedProcedure.query(async () => {
    const studies = await prisma.study.findMany({
      where: {
        published: true,
      },
      include: {
        User: true,
      },
    });
    return studies;
  }),

  getAllUserStudies: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id || ctx.session.user.id !== input.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      const studies = await prisma.study.findMany({
        include: {
          User: true,
        },
        where: {
          authorId: input.id,
        },
      });
      return studies;
    }),

  getUserStudies: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const studies = await prisma.study.findMany({
        include: {
          User: true,
        },
        where: {
          published: true,
          authorId: input.id,
        },
      });
      return studies;
    }),

  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const studies = await prisma.study.findMany({
        include: {
          User: true,
        },
        where: {
          title: {
            contains: input.query,
            mode: 'insensitive',
          },
        },
      });
      return studies;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        authorId: z.string(),
        questions: z.array(
          z.object({
            question: z.string(),
            answer: z.string(),
            index: z.number(),
          })
        ),
        published: z.optional(z.boolean()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { questions, ...study } = input;
      const createdStudy = await prisma.study.create({ data: study });

      if (!ctx.session?.user?.id || ctx.session.user.id !== study.authorId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      await prisma.$transaction(
        questions.map(question =>
          prisma.question.create({
            data: {
              ...question,
              studyId: createdStudy.id,
            },
          })
        )
      );

      return createdStudy;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        authorId: z.string(),
        questions: z.array(
          z.object({
            id: z.optional(z.string()),
            index: z.number(),
            question: z.string(),
            answer: z.string(),
          })
        ),
        published: z.optional(z.boolean()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { questions, ...studyRest } = input;
      const study = await prisma.study.findUnique({
        where: {
          id: input.id,
        },
        include: {
          questions: {
            orderBy: {
              index: 'asc',
            },
          },
          User: true,
        },
      });

      if (study === null) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      const subject = await prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      const object = await prisma.user.findUnique({
        where: { id: study.authorId },
      });

      if (!subject || !object) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      const isMyStudy = study.authorId === subject.id;
      const amAdmin = subject.role !== 'ADMIN';
      const isAuthorAdmin = object.role === 'ADMIN';

      if (!isMyStudy && (!amAdmin || isAuthorAdmin)) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const DBQuestions = study.questions;
      const questionsToDelete = DBQuestions.filter(
        question =>
          !questions.find(inputQuestion => inputQuestion.id === question.id)
      );

      const upsertOperations = questions.map(question => {
        const { id, ...restQuestion } = question;

        return prisma.question.upsert({
          create: {
            ...restQuestion,
            studyId: input.id,
          },
          update: restQuestion,
          where: { id: id || '' },
        });
      });
      const deleteOperations = questionsToDelete.map(({ id }) =>
        prisma.question.delete({
          where: {
            id,
          },
        })
      );

      const operations = upsertOperations.concat(deleteOperations);
      await prisma.$transaction(operations);

      await prisma.study.update({
        where: { id: studyRest.id },
        data: studyRest,
      });

      return input;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const study = await prisma.study.findUnique({ where: input });

      if (!study) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      if (ctx.session.user.id !== study.authorId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return await prisma.study.delete({
        where: input,
      });
    }),
});
