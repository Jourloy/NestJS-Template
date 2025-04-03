import {Module} from "@nestjs/common";
import {AppController} from "./app/app.controller";
import {AppService} from "./app/app.service";
import {ConfigModule} from "@nestjs/config";
import {ThrottlerModule} from "@nestjs/throttler";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
		}),
		ThrottlerModule.forRoot({
			throttlers: [
				{
					ttl: 60000,
					limit: 10,
				},
			],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
