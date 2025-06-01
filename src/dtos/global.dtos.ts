// //We need to register those all dtos here because dtos are not the part of the prisma. Those are explictly required for the graphql. and .dto files are used
// //while validating graphql

// // are they being used ?. please test whether we need it or in global.enum

// import { registerEnumType } from '@nestjs/graphql';
// import {
//   // Badges as PrismaBadges,
//   UserType as PrismaUserType,
//   GenderType as PrismaGenderType,
//   HostelType as PrismaHostelType,
//   GalleryType as PrismaGalleryType,
//   VisibilityType as PrismaVisibilityType,
// } from '@prisma/client';

// export { PrismaUserType as UserType };
// export { PrismaGenderType as GenderType };
// export { PrismaHostelType as HostelType };

// export { PrismaVisibilityType as VisibilityType };
// export { PrismaGalleryType as GalleryType };
// // export { PrismaBadges as Badges };

// registerEnumType(PrismaUserType, {
//   name: 'UserType',
// });

// registerEnumType(PrismaGenderType, {
//   name: 'GenderType',
// });

// registerEnumType(PrismaHostelType, {
//   name: 'HostelType',
// });

// registerEnumType(PrismaVisibilityType, {
//   name: 'VisibilityType',
// });

// registerEnumType(PrismaGalleryType, {
//   name: 'GalleryType',
// });

// // registerEnumType(PrismaBadges, {
// //   name: 'Badges',
// // });
