import { seedProducts, clearProducts } from '../lib/seedData.ts';

async function main() {
  const command = process.argv[2];
  
  try {
    switch (command) {
      case 'seed':
        await seedProducts();
        break;
      case 'clear':
        await clearProducts();
        break;
      default:
        console.log('Usage: node seedDatabase.mjs [seed|clear]');
        process.exit(1);
    }
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
}

main();
