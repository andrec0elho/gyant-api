import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Condition extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);
