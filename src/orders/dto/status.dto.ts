import { IsEnum } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class StatusDTO {
  @IsEnum(OrderStatusList, {
    message: `Posible status values are ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
