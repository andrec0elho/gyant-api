import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConditionModule } from './condition/condition.module';
import { CaseModule } from './case/case.module';

const modules = [UserModule, AuthModule, ConditionModule, CaseModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class MainModule {}
