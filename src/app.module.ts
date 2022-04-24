import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { RequestService } from "./services/requests";
import { ConfigModule } from "@nestjs/config";
import { CacheService } from "./services/cache";
import * as redisStore from "cache-manager-redis-store";
import { LinksController } from "./controllers/links";
import { LinksService } from "./services/links";
import { ParsingService } from "./services/parsing";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379,
      max: 1000,
      ttl: process.env.REDIS_PERSISTENCE_PERIOD_IN_SECONDS
        ? parseInt(process.env.REDIS_PERSISTENCE_PERIOD_IN_SECONDS)
        : 60 * 60 * 24,
    }),
  ],
  controllers: [LinksController],
  providers: [RequestService, CacheService, LinksService, ParsingService],
})
export class AppModule {}
