import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

import { prisma } from "../../db";
import { Query } from "@tanstack/react-query";

export const studyRouter = createTRPCRouter( {

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query( async ( { input } ) => {
      const study = await prisma.study.findUnique( { 
        where: input,
        include: {
          questions: true
        }
      } )
      return study;
    } ),

    getAll: publicProcedure.query( async ( { ctx } ) => {
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

  getUserStudies: publicProcedure
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

  search: publicProcedure
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

  create: publicProcedure
    .input( z.object( { 
      title: z.string(),
      authorId: z.string(),
      questions: z.array( z.object( {
        question: z.string(),
        answer: z.string(),
      } ) ),
      published: z.optional( z.boolean() )
    } ) )
    .mutation( async ( { input } ) => {

      const { questions, ...study } = input;

      const createdStudy = await prisma.study.create( {
        data: study
      } )
      
      await Promise.all( questions.map( question => prisma.question.create( { 
        data: {
          ...question,
          studyId: createdStudy.id
        }
      } ) ) )

      return createdStudy;
    } )
    
} );
