import { Module } from '@nestjs/common';
import { ConditionController } from './condition.controller';
import { ConditionService } from './condition.service';
import { ConditionRepository } from './condition.repository';
import { ConditionSchema } from './schemas/condition.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Condition', schema: ConditionSchema }])],
  controllers: [ConditionController],
  providers: [ConditionService, ConditionRepository],
})
export class ConditionModule {}
