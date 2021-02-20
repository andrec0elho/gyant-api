import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { MongooseModule } from '@nestjs/mongoose';
import { MainModule } from './modules/main.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EmptyResponseInterceptor } from './interceptors/empty-response.interceptor';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('app.mongoUri'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.resolveRootPath(__dirname).load('config/**/!(*.d).{ts,js}'),
    MainModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: EmptyResponseInterceptor,
    },
  ],
  exports: [],
})
export class AppModule {}
