import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const WAIT_FOR_DB_MS = 5000;

async function main() {
    const users = await prisma.user.findMany({
        where: {
            email: {
                in: [
                    'bogdan.balan@thinslices.com',
                    'cristian.gherghel@thinslices.com',
                    'razvan.onofrei@thinslices.com',
                ],
            },
        },
    });

    await Promise.all(
        users.map(async user => {
            return prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    role: 'ADMIN',
                },
            });
        })
    );
}

try {
    console.log(`Waiting ${WAIT_FOR_DB_MS}ms before running database seed...`);
    await delay(5000);

    console.log('Seeding database...');
    await main();
} catch (error) {
    console.error(error);
} finally {
    await prisma.$disconnect();
    console.log('Database seeded successfully!');
}
