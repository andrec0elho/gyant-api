import { ValidatorConstraintInterface, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'IsBooleanValidator', async: false })
export class IsBooleanValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!value) {
      return true;
    }
    return value === 'true' || value === 'false';
  }

  defaultMessage() {
    return 'evaluated must be a boolean value';
  }
}
