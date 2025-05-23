import { v4 as uuidv4 } from 'uuid';

export function generateSlug(name: string): string {
  // Remove special characters and spaces from the hostel name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Generate a UUID for uniqueness
  const uniqueId = uuidv4().split('-')[0]; // Extracting the first part of the UUID

  // Concatenate the slug and the UUID
  const finalSlug = `${slug}-${uniqueId}`;

  return finalSlug;
}
