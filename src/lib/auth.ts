import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "laotongzhuo-admin-secret-key-2024";

export interface AuthUser {
  userId: string;
  username: string;
  role: string;
}

export async function verifyAuth(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await verifyAuth();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
