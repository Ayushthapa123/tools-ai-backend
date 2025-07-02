import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { SearchHostelInput } from './dtos/search-hostel.input';

@Injectable()
export class SearchHostelService {
  constructor(private readonly prisma: PrismaService) {}

  async getHostels(input: SearchHostelInput) {
    const pageSize = 10;
    const pageNumber = input.pageNumber || 1;
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const userLat = input.latitude;
    const userLng = input.longitude;
    const city = input.city || '';
    const subCity = input.subCity || '';
    const checkInDate = input.checkInDate || new Date('1970-01-01');
    const checkOutDate = input.checkOutDate || new Date('1970-01-01');

    const initialRadius = 5; // Initial search radius in KM
    const radiusStep = 5; // Increase by 5km each time
    const maxRadius = 50; // Maximum allowed radius expansion

    let radiusInKm = initialRadius;
    let hostels: any[] = [];

    // Prepare whereCondition for Prisma fallback search
    const whereCondition: any = {
      address: {
        city: { contains: city, mode: 'insensitive' },
        subCity: { contains: subCity, mode: 'insensitive' },
      },
      verifiedBySuperAdmin: true,
    };

    // If lat/lng provided, search by distance
    if (userLat && userLng) {
      while (radiusInKm <= maxRadius) {
        hostels = await this.prisma.$queryRawUnsafe<any[]>(
          `
          SELECT h.*, 
            (
              6371 * acos(
                cos(radians($1)) * cos(radians(a."latitude")) * cos(radians(a."longitude") - radians($2)) +
                sin(radians($1)) * sin(radians(a."latitude"))
              )
            ) AS distance,
            jsonb_build_object(
              'id', a.id,
              'hostelId', a."hostelId",
              'city', a.city,
              'subCity', a."subCity",
              'street', a.street,
              'country', COALESCE(a.country, 'Nepal'),
              'latitude', a.latitude,
              'longitude', a.longitude,
              'createdAt', a."createdAt",
              'updatedAt', a."updatedAt"
            ) as address,
            COALESCE(
              json_agg(
                DISTINCT jsonb_build_object(
                  'id', g.id,
                  'hostelId', g."hostelId",
                  'type', g.type,
                  'caption', g.caption,
                  'url', g.url,
                  'isSelected', g."isSelected",
                  'createdAt', g."createdAt",
                  'updatedAt', g."updatedAt"
                )
              ) FILTER (WHERE g.id IS NOT NULL),
              '[]'::json
            ) as gallery,
            COALESCE(
              (
                SELECT jsonb_build_object(
                  'id', c.id,
                  'phone', COALESCE(c.phone, ''),
                  'altPhone', COALESCE(c."altPhone", ''),
                  'email', COALESCE(c.email, ''),
                  'hostelId', h.id,
                  'createdAt', c."createdAt",
                  'updatedAt', c."updatedAt"
                )
                FROM "ContactDetail" c
                WHERE c."hostelId" = h.id
                LIMIT 1
              ),
              jsonb_build_object(
                'id', null,
                'phone', '',
                'altPhone', '',
                'email', '',
                'hostelId', h.id,
                'createdAt', null,
                'updatedAt', null
              )
            ) as contact
          FROM "Hostel" h
          INNER JOIN "Address" a ON h."id" = a."hostelId"
          LEFT JOIN "Gallery" g ON h."id" = g."hostelId"
          WHERE 
            ($3 = '' OR a."city" ILIKE '%' || $3 || '%')
            AND ($4 = '' OR a."subCity" ILIKE '%' || $4 || '%')
            AND (
              6371 * acos(
                cos(radians($1)) * cos(radians(a."latitude")) * cos(radians(a."longitude") - radians($2)) +
                sin(radians($1)) * sin(radians(a."latitude"))
              )
            ) <= $5
            AND h."verifiedBySuperAdmin" = true
          GROUP BY h.id, a.id
          ORDER BY distance ASC
          OFFSET $6
          LIMIT $7;
          `,
          userLat,
          userLng,
          city,
          subCity,
          radiusInKm,
          skip,
          take,
        );

        if (hostels.length > 0) {
          break; // Found some results
        }

        radiusInKm += radiusStep; // Expand radius
      }
    }
    // If no lat/lng, fallback to Prisma query (city/subCity based)
    else {
      hostels = await this.prisma.hostel.findMany({
        skip,
        take,
        include: {
          address: true,
          contact: true,
          gallery: true,
          // image: true,
        },
        where: whereCondition,
      });
    }
    console.log('hhhhhhhhh', hostels);
    // Map rooms with RoomStatus correctly
    const mappedHostels = hostels.map((hostel) => ({
      ...hostel,
    }));
    return {
      data: mappedHostels,
      error: null,
    };
  }
}
