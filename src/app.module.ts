import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'nestjs-config';
import { MongooseModule } from '@nestjs/mongoose';
import { MainModule } from './modules/main.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:gyantadmin@localhost:27017/gyant?authSource=admin',
    ),
    ConfigModule.resolveRootPath(__dirname).load('config/**/!(*.d).{ts,js}'),
    MainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
