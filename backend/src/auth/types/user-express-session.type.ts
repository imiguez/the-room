import { User } from 'src/users/schema/user.schema';

export type ExpressSessionUser = Pick<
  User,
  '_id' | 'firstName' | 'lastName' | 'imageUrl'
>;
