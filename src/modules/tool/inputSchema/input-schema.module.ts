import { Module } from '@nestjs/common';
import { InputSchemaService } from './input-schema.service';
import { InputSchemaResolver } from './input-schema.resolver';

@Module({
  providers: [InputSchemaResolver, InputSchemaService],
})
export class InputSchemaModule {}
