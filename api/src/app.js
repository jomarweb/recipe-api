const connectToDB = require('./daos/mongoose');
const buildRouter = require('./api-routes/index');

async function main() {
  const isConnected = await connectToDB();

  if (isConnected) {
    buildRouter();
  } else {
    console.log('can\'t connect to database');
  }
}

main();
