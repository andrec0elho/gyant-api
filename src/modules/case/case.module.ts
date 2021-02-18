import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseSchema } from './schemas/case.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Case', schema: CaseSchema }])],
})
export class CaseModule {}
