import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MailersendService } from './mailersend.service';
import { BookingConfirmationEmailDto } from './dtos/bookingDetails.dto';

@Resolver()
export class MailersendResolver {
  constructor(private readonly mailersendService: MailersendService) {}

  @Query(() => Boolean)
  async sendVerificationEmail(
    @Args('email') email: string,
    @Args('token') token: string,
    @Args('name') name: string,
  ) {
    return this.mailersendService.sendEmailForVerification(email, token, name);
  }

  @Mutation(() => Boolean)
  async sendMailAfterBooking(
    @Args('email') email: string,
    @Args('data') data: BookingConfirmationEmailDto,
  ) {
    return this.mailersendService.sendMailAfterBooking(email, data);
  }

  @Mutation(() => Boolean)
  async sendCustomEmail(
    @Args('email') email: string,
    @Args('name') name: string,
    @Args('subject') subject: string,
    @Args('htmlContent') htmlContent: string,
  ) {
    return this.mailersendService.sendCustomEmail(
      email,
      name,
      subject,
      htmlContent,
    );
  }
}
