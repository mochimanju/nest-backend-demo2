import { CreateCatMessageInput } from './create-cat-message.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCatMessageInput extends PartialType(CreateCatMessageInput) {
  id: number;
}
