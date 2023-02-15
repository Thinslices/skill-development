import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    get: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const user = await prisma.user.findUnique({
                where: input,
            });
            return user;
        }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
        return await prisma.user.findMany();
    }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const user = await prisma.user.findUnique({ where: input });
            
            if ( ! user ) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }
            
            if ( !ctx.session?.user?.id ) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            
            const subject = await prisma.user.findUnique( { where: { id: ctx.session.user.id } } );
            const object = await prisma.user.findUnique( { where: input } );
            
            if ( subject?.role !== "ADMIN" || object?.role === "ADMIN" ) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
                
            return await prisma.$transaction( [
                prisma.study.deleteMany({ where: { authorId: input.id } }),
                prisma.user.delete({ where: input }),
            ] );
        }),
});
