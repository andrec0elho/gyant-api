import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Case extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  conditionId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: string;

  @Prop({ required: true })
  evaluated = false;

  @Prop({ required: true })
  created: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
