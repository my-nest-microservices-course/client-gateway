import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
