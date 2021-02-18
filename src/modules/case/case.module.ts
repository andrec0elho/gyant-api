import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseSchema } from './schemas/case.schema';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Case', schema: CaseSchema }])],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
