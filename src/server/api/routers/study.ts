import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

import { prisma } from "../../db";

import { TRPCError } from "@trpc/server";

export const studyRouter = createTRPCRouter( {

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query( async ( { input } ) => {
      const study = await prisma.study.findUnique( { 
        where: input,
        include: {
          questions: {
            orderBy: {
              index: 'asc',
            },
          }
        }
      } )
      return study;
    } ),

    getAll: protectedProcedure.query( async ( { ctx } ) => {
      const studies = await prisma.study.findMany( {
        where: {
          published: true
        },
        include: {
          User: true
        }
      } );
      return studies;
    } ),

  getUserStudies: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query( async ( { input } ) => {
    const studies = await prisma.study.findMany( {
      include: {
        User: true
      },
      where: {
        authorId: input.id
      },
    } );
    return studies;
  } ),

  search: protectedProcedure
    .input( z.object( { query: z.string() } ) )
    .query( async ( { input } ) => {
    const studies = await prisma.study.findMany( {
      include: {
        User: true
      },
      where: {
        title: {
          contains: input.query,
          mode: 'insensitive'
        }
      },
    } );
    return studies;
  } ),

  create: protectedProcedure
    .input( z.object( { 
      title: z.string(),
      authorId: z.string(),
      questions: z.array( z.object( {
        question: z.string(),
        answer: z.string(),
        index: z.number()
      } ) ),
      published: z.optional( z.boolean() )
    } ) )
    .mutation( async ( { ctx, input } ) => {
      const { questions, ...study } = input;
      const createdStudy = await prisma.study.create( { data: study } );

      if ( ! ctx.session?.user?.id || ctx.session.user.id !== study.authorId ) {
        throw new TRPCError( { code: 'UNAUTHORIZED' } );
      }

      await prisma.$transaction( questions.map( question => prisma.question.create( { 
        data: {
          ...question,
          studyId: createdStudy.id
        }
      } ) ) )

      return createdStudy;
    } ),

    update: protectedProcedure
      .input( z.object( { 
        id: z.string(),
        title: z.string(),
        authorId: z.string(),
        questions: z.array( z.object( {
          id: z.optional( z.string() ),
          index: z.number(),
          question: z.string(),
          answer: z.string(),
        } ) ),
        published: z.optional( z.boolean() )
      } ) )
      .mutation( async ( { input } ) => {
        const { questions, ...study } = input;

        await prisma.$transaction(
          questions.map( question => {
            const { id, ...restQuestion } = question;
            return prisma.question.upsert( {
              create: {
                ...restQuestion,
                studyId: input.id
              },
              update: restQuestion,
              where: { id: id || '' },
            } );
          } )
        );

        await prisma.study.update( { 
          where: { id: study.id },
          data: study
        } )

        return input;
      } ),

      delete: protectedProcedure
        .input(z.object( { id: z.string() } ) )
        .mutation( async ( { ctx, input } ) => {

          const study = await prisma.study.findUnique( { where: input } );

          if ( ! study ) {
            throw new TRPCError( { code: "NOT_FOUND" } );
          }

          if ( ! ctx.session?.user?.id || ctx.session.user.id !== study.authorId ) {
            throw new TRPCError( { code: 'UNAUTHORIZED' } );
          }

          return await prisma.study.delete( { 
            where: input,
          } )
        } ),
    
} );
