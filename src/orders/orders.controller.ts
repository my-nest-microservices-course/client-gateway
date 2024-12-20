import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { StatusDTO } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      return this.client.send({ cmd: 'create-order' }, createOrderDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAllOrders(@Query() paginationDto: OrderPaginationDto) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'find-all-orders' }, paginationDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
  //a0f9c4eb-129a-4591-b8d1-ecd08283da51
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'find-one-order' }, id),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Patch(':id')
  async updateStatusOrder(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() statusDto: StatusDTO,
  ) {
    try {
      return await firstValueFrom(
        this.client.send(
          { cmd: 'change-order-status' },
          { id, status: statusDto.status },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
