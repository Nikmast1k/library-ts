import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';

import { IParamId } from './interfaces/param-id';
import { CreateBook } from './interfaces/dto/create.book';
import { BookDocument } from './schemas/books.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  public create(@Body() body: CreateBook): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @Get()
  public getAll(): Promise<BookDocument[]> {
    return this.booksService.getAll();
  }

  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: CreateBook,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument> | null,
    HydratedDocument<BookDocument>,
    {},
    BookDocument
  > {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  public delete(
    @Param() { id }: IParamId,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument> | null,
    HydratedDocument<BookDocument>,
    {},
    BookDocument
  > {
    return this.booksService.delete(id);
  }
}
