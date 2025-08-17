import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MailersendService } from './mailersend.service';

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
