import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: {
        email: {
            in: [ 'razvan.onofrei@thinslices.com', 'cristian.gherghel@thinslices.com' ]
        }
    }
  });

  await Promise.all( users.map( async ( user ) => {
    return prisma.user.update( {
        where: {
            id: user.id
        },
        data: {
            role: 'ADMIN'
        }
    } )
  } ) )
}

try {
    await main()
} catch ( error ) {
    console.error( error );
} finally {
    await prisma.$disconnect();
}
