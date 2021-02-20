import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'nestjs-config';
import { MongooseModule } from '@nestjs/mongoose';
import { MainModule } from './modules/main.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EmptyResponseInterceptor } from './interceptors/empty-response.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:gyantadmin@localhost:27017/gyant?authSource=admin'),
    ConfigModule.resolveRootPath(__dirname).load('config/**/!(*.d).{ts,js}'),
    MainModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: EmptyResponseInterceptor,
    },
  ],
  exports: [],
})
export class AppModule {}
