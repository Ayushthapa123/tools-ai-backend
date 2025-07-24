import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import {
  CtxType,
  HostelApplicationForm,
  HostelApplicationFormList,
} from '@src/models/global.model';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';

import { HostelApplicationFormService } from './hostelApplicationForm.service';
import { UserType } from '@prisma/client';
import { CreateHostelApplicationFormInput } from './dtos/hostel-application-form.input';
import { UpdateHostelApplicationFormInput } from './dtos/update-hostel-application-form.input';
// import { Controller } from '@nestjs/common';

@Resolver(() => HostelApplicationForm)
export class HostelApplicationFormResolver {
  constructor(
    private readonly hostelApplicationFormService: HostelApplicationFormService,
  ) {}

  @Query(() => HostelApplicationFormList)
  @UseGuards(AuthGuard)
  async getAllHostelApplicationForms(
    @Args('pageSize', { type: () => Int, defaultValue: 50 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Context() ctx: CtxType,
  ) {
    if (ctx.user.userType !== UserType.SUPERADMIN) {
      throw new ForbiddenException(
        'You are not allowed to access hostel application forms',
      );
    }
    return this.hostelApplicationFormService.getAllHostelApplicationForms(
      pageSize,
      pageNumber,
    ); // Issue is caused by the async return type. which is not required
  }

  @Query(() => HostelApplicationFormList)
  @UseGuards(AuthGuard)
  async getAllHostelApplicationFormsByHostelId(
    @Args('pageSize', { type: () => Int, defaultValue: 50 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Context() ctx: CtxType,
  ) {
    if (ctx.user.userType !== UserType.HOSTEL_OWNER) {
      throw new ForbiddenException(
        'You are not allowed to access hostel application forms',
      );
    }
    return this.hostelApplicationFormService.getAllHostelApplicationFormsByHostelId(
      pageSize,
      pageNumber,
      ctx.user.hostelId,
    );
  }
  @Query(() => HostelApplicationFormList)
  @UseGuards(AuthGuard)
  async getHostelApplicationFormsByUserId(
    @Args('pageSize', { type: () => Int, defaultValue: 50 }) pageSize: number,
    @Args('pageNumber', { type: () => Int, defaultValue: 1 })
    pageNumber: number,
    @Context() ctx: CtxType,
  ) {
    return this.hostelApplicationFormService.getHostelApplicationFormByUserId(
      pageSize,
      pageNumber,
      ctx.user.sub,
    ); // Issue is caused by the async return type. which is not required
  }

  @Query(() => HostelApplicationForm, { nullable: true })
  async getHostelApplicationFormById(@Args('id') id: number) {
    const res =
      await this.hostelApplicationFormService.getHostelApplicationFormById(id);
    return res;
  }

  @Mutation(() => HostelApplicationForm)
  async createHostelApplicationForm(
    @Context() ctx: CtxType,
    @Args('data') data: CreateHostelApplicationFormInput,
  ) {
    return this.hostelApplicationFormService.createHostelApplicationForm(data);
  }

  @Mutation(() => HostelApplicationForm)
  @UseGuards(AuthGuard)
  async updateHostelApplicationForm(
    @Args('data') data: UpdateHostelApplicationFormInput,
  ) {
    // it should be updateable by superadmin and the owner of this form
    return this.hostelApplicationFormService.updateHostelApplicationForm(data);
  }

  @Mutation(() => HostelApplicationForm)
  @UseGuards(AuthGuard)
  async deleteHostelApplicationForm(
    @Args('id') id: number,
    @Context() ctx: CtxType,
  ) {
    // prevent delete by other users then writer or superadmin
    if (
      ctx.user.userType !== UserType.WRITER &&
      ctx.user.userType !== UserType.SUPERADMIN
    ) {
      throw new ForbiddenException(
        'You are not allowed to delete hostel application form',
      );
    }

    return this.hostelApplicationFormService.deleteHostelApplicationForm(id);
  }
}
