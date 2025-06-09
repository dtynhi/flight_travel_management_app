export default interface IUser {
  id: number;
  email: string;
  full_name: string | null;
  identification_number: string | null;
  phone_number: string | null;
  permissions: string[];
  roles: string;
  status: string;
}
