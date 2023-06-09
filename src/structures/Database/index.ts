import mongoose, { ConnectOptions } from "mongoose";
import chalk from 'chalk';
import { Noelly } from "../Client";

mongoose.set("strictQuery", true);

interface MongooseConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export class Database {
  private client: Noelly;

  constructor(client: Noelly) {
    this.client = client;
  }

  async start(): Promise<void> {
    try {
      const mongooseOptions: MongooseConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      await mongoose.connect(process.env.MONGO_URL, mongooseOptions);

      console.log(chalk.white.bold("━━━━━━━━━━━━━━━━━━━━━[ Database ]"))
      console.log(`${chalk.whiteBright.bold(`[ ${chalk.blueBright.bold("Mongoose")} ]`)} Status: ${chalk.greenBright.bold("loaded")}`)
    } catch (err) {
      console.log(`Vixi deu erro na mongoDB\n${err}`);
    }
  }
}
