import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId, ObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const isMongoId = isValidObjectId(value);

    if(!isMongoId) throw new BadRequestException('id param is not a MongoId');
    return value;
  }
}
