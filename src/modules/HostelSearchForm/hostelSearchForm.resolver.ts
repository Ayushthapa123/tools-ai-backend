import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import {
  HostelSearchForm,
  CtxType,
  HostelSearchFormList,
} from '@src/models/global.model';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

import { HostelSearchFormService } from './hostelSearchForm.service';
import { UserType } from '@prisma/client';
import { CreateHostelSearchFormInput } from './dtos/hostel-search-form.input';
import { UpdateHostelSearchFormInput } from './dtos/update-hostel-search-form.input';
// import { Controller } from '@nestjs/common';

@Resolver(() => HostelSearchForm)
export class HostelSearchFormResolver {
  constructor(
    private readonly hostelSearchFormService: HostelSearchFormService,
  ) {}

  @Query(() => HostelSearchFormList)
  @UseGuards(AuthGuard)
  async getAllHostelSearchForms(
    @Args('pageSize', { type: () => Int, defaultValue: 50 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Context() ctx: CtxType,
  ) {
    if (ctx.user.userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not allowed to access hostel search forms',
      );
    }
    return this.hostelSearchFormService.getAllHostelSearchForms(
      pageSize,
      pageNumber,
    ); // Issue is caused by the async return type. which is not required
  }

  @Query(() => HostelSearchFormList)
  @UseGuards(AuthGuard)
  async getHostelSearchFormsByUserId(
    @Args('pageSize', { type: () => Int, defaultValue: 50 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Context() ctx: CtxType,
  ) {
    return this.hostelSearchFormService.getHostelSearchFormByUserId(
      pageSize,
      pageNumber,
      ctx.user.sub,
    ); // Issue is caused by the async return type. which is not required
  }

  @Query(() => HostelSearchForm, { nullable: true })
  async getHostelSearchFormById(@Args('id') id: number) {
    const res = await this.hostelSearchFormService.getHostelSearchFormById(id);
    return res;
  }

  @Mutation(() => HostelSearchForm)
  async createHostelSearchForm(
    @Context() ctx: CtxType,
    @Args('data') data: CreateHostelSearchFormInput,
  ) {
    return this.hostelSearchFormService.createHostelSearchForm(data);
  }

  @Mutation(() => HostelSearchForm)
  @UseGuards(AuthGuard)
  async updateHostelSearchForm(
    @Args('data') data: UpdateHostelSearchFormInput,
  ) {
    // it should be updateable by superadmin and the owner of this form
    return this.hostelSearchFormService.updateHostelSearchForm(data);
  }

  @Mutation(() => HostelSearchForm)
  @UseGuards(AuthGuard)
  async deleteHostelSearchForm(
    @Args('id') id: number,
    @Context() ctx: CtxType,
  ) {
    // prevent delete by other users then writer or superadmin
    if (
      ctx.user.userType !== UserType.WRITER &&
      ctx.user.userType !== UserType.SUPERADMIN
    ) {
      throw new ForbiddenException(
        'You are not allowed to delete hostel search form',
      );
    }

    return this.hostelSearchFormService.deleteHostelSearchForm(id);
  }
}
