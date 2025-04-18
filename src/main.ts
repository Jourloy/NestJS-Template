import {version} from "../package.json";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
import * as session from "express-session";
import helmet from "helmet";
import {doubleCsrf} from "csrf-csrf";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {apiReference} from "@scalar/nestjs-api-reference";
import {EnvConfig} from "./config/env";

const {
	doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
	getSecret: () => process.env.SESSION_SECRET ?? "",
});

async function bootstrap() {
	const envConfig = new EnvConfig();
	envConfig.checkAndThrow();

	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("NestJS Template")
		.setDescription("The NestJS Template API description")
		.setVersion(version)
		.addTag("nestjs-template")
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);

	app.use(
		"/reference",
		apiReference({
			content: documentFactory(),
		})
	);

	app.enableCors({
		origin: ["http://localhost:3000"],
		credentials: true,
	});

	app.use(
		session({
			secret: process.env.SESSION_SECRET!,
			resave: false,
			saveUninitialized: false,
		})
	);
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.use(compression());
	app.use(helmet());
	app.use(doubleCsrfProtection);

	await app.listen(process.env.PORT!);
}
void bootstrap();
