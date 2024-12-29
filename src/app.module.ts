import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule, HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
