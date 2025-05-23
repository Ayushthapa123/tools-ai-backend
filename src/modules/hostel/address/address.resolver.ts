import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { Address } from '@src/models/global.model';
import { CreateAddressInput } from './dtos/create-address.input';
import { UpdateAddressInput } from './dtos/update-address.input';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => Address, { nullable: true })
  async getAddressByHomestayId(
    @Args('hostelId') hostelId: number,
  ): Promise<Address | null> {
    return this.addressService.getAddressByHomestayId(hostelId);
  }

  @Mutation(() => Address)
  async createAddress(
    @Args('data') data: CreateAddressInput,
  ): Promise<Address> {
    return this.addressService.createAddress(data);
  }

  @Mutation(() => Address)
  async updateAddress(
    @Args('addressId') addressId: number,
    @Args('data') data: UpdateAddressInput,
  ): Promise<Address> {
    return this.addressService.updateAddress(addressId, data);
  }
}
