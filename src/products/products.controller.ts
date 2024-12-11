import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from '../common/dto/pagination.dto';
import { NATS_SERVICE } from '../config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createProducts(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create-product' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find-all-products' }, paginationDto);
  }

  @Get(':id')
  async findOneProducts(@Param('id', ParseIntPipe) id: string) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'find-one-product' }, { id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async removeProducts(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'remove-product' }, { id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await firstValueFrom(
        this.client.send(
          { cmd: 'update-product' },
          { id, ...updateProductDto },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
