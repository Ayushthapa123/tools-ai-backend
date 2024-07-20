//We need to register those all dtos here because dtos are not the part of the prisma. Those are explictly required for the graphql. and .dto files are used 
//while validating graphql

import { registerEnumType } from '@nestjs/graphql';
import { 
  UserType as PrismaUserType,
  GenderType as PrismaGenderType,
  HostelType as PrismaHostelType,
 
  VisibilityType as PrismaVisibilityType,
  GalleryType as PrismaGalleryType,
  SubscriptionPlans as PrismaSubscriptionPlans,
  DataSource as PrismaDataSource,
  Badges as PrismaBadges,
  


} from '@prisma/client';

export { PrismaUserType as UserType };
export { PrismaGenderType as GenderType };
export { PrismaHostelType as HostelType };

export { PrismaVisibilityType as VisibilityType };
export { PrismaGalleryType as GalleryType };
export { PrismaSubscriptionPlans as SubscriptionPlans };
export { PrismaDataSource as DataSource };
export { PrismaBadges as Badges };

registerEnumType(PrismaUserType, {
  name: 'UserType',
});

registerEnumType(PrismaGenderType, {
  name: 'GenderType',
});

registerEnumType(PrismaHostelType, {
  name: 'HostelType',
});



registerEnumType(PrismaVisibilityType, {
  name: 'VisibilityType',
});

registerEnumType(PrismaGalleryType, {
  name: 'GalleryType',
});

registerEnumType(PrismaSubscriptionPlans, {
  name: 'SubscriptionPlans',
});

registerEnumType(PrismaDataSource, {
  name: 'DataSource',
});

registerEnumType(PrismaBadges, {
  name: 'Badges',
});
