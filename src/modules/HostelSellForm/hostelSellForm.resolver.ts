import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import {
  CtxType,
  HostelSellForm,
  HostelSellFormList,
} from '@src/models/global.model';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

import { HostelSellFormService } from './hostelSellForm.service';
import { UserType } from '@prisma/client';
import { CreateHostelSellFormInput } from './dtos/hostel-sell-form.input';
import { UpdateHostelSellFormInput } from './dtos/update-hostel-sell-form.input';
// import { Controller } from '@nestjs/common';

@Resolver(() => HostelSellForm)
export class HostelSellFormResolver {
  constructor(private readonly hostelSellFormService: HostelSellFormService) {}

  @Query(() => HostelSellFormList)
  @UseGuards(AuthGuard)
  async getAllHostelSellForms(
    @Args('pageSize', { type: () => Int, defaultValue: 50 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Context() ctx: CtxType,
  ) {
    if (ctx.user.userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not allowed to access hostel sell forms',
      );
    }
    return this.hostelSellFormService.getAllHostelSellForms(
      pageSize,
      pageNumber,
    ); // Issue is caused by the async return type. which is not required
  }

  @Query(() => HostelSellForm, { nullable: true })
  async getHostelSellFormById(@Args('id') id: number) {
    const res = await this.hostelSellFormService.getHostelSellFormById(id);
    return res;
  }

  @Mutation(() => HostelSellForm)
  async createHostelSellForm(
    @Context() ctx: CtxType,
    @Args('data') data: CreateHostelSellFormInput,
  ) {
    return this.hostelSellFormService.createHostelSellForm(data);
  }

  @Mutation(() => HostelSellForm)
  @UseGuards(AuthGuard)
  async updateHostelSellForm(@Args('data') data: UpdateHostelSellFormInput) {
    // it should be updateable by superadmin and the owner of this form
    return this.hostelSellFormService.updateHostelSellForm(data);
  }

  @Mutation(() => HostelSellForm)
  @UseGuards(AuthGuard)
  async deleteHostelSellForm(@Args('id') id: number, @Context() ctx: CtxType) {
    // prevent delete by other users then writer or superadmin
    if (
      ctx.user.userType !== UserType.WRITER &&
      ctx.user.userType !== UserType.SUPERADMIN
    ) {
      throw new ForbiddenException(
        'You are not allowed to delete hostel sell form',
      );
    }

    return this.hostelSellFormService.deleteHostelSellForm(id);
  }
}
