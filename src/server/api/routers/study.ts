import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

import { prisma } from "../../db";

export const studyRouter = createTRPCRouter( {

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query( async ( { input } ) => {
      const study = await prisma.study.findUnique( { 
        where: input
      } )
      return study;
    } ),

  getAll: publicProcedure.query( async ( { ctx } ) => {
    const studies = await prisma.study.findMany( {
      include: {
        User: true
      }
    } );
    return studies;
  } ),

  create: publicProcedure
    .input( z.object( { 
      title: z.string(),
      content: z.string(),
      authorId: z.string()
    } ) )
    .mutation( async ( { input } ) => {
      const createdStudy = await prisma.study.create( {
        data: input
      } )

      return createdStudy;
    } )
    
} );
