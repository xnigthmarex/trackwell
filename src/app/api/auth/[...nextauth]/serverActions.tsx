"use server"
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';


export async function authenticateUser(email: string, password: string) {
  // Find the user by email address
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  // Check if the user is a Google user
  if (user.type === 'GOOGLE') {
    return null
  }

  // Check that the password is valid
  const passwordValid = await bcrypt.compare(password, user.password!);
  if (!passwordValid) {
    return null;
  }

  // Return the user
  return user;
}

export const handleGoogleSignIn = async (account: any, profile: any) => {
  try {
    // Check if the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email: profile.email as string },
    });

    if (!existingUser) {
      // Add the Google user to the database
      await prisma.user.create({
        data: {
          id: account.providerAccountId,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          type: 'GOOGLE', // Enum value indicating the user is from Google
          // Add other fields as needed
        },
      });
    } else if (existingUser.type !== 'GOOGLE') {
      // Handle the case where a local user with the same email exists
      // You can either merge the accounts or return an error
      console.error("A local user with the same email already exists.");
      return false;
    }
    return true;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};
