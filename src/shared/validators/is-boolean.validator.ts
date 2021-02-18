import { ValidatorConstraintInterface, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'IsBooleanValidator', async: false })
export class IsBooleanValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return value === 'true';
  }

  defaultMessage() {
    return 'evaluated must be a boolean value';
  }
}
