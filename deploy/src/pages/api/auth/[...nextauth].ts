import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signIn, signInWithGoogle } from "../../../utils/db/servicefirebase";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // fullname: {label: "Full Name", type: "text"},
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                const user: any = await signIn(credentials.email);

                if (user){
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if(isPasswordValid){
                        const fullname = user.fullname || user.name || user.fullName || "";
                        return {
                            id: user.id,
                            email: user.email,
                            fullname,
                            name: fullname,
                            role: user.role,
                        };
                    }
                }
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),

    ],

    callbacks: {
        async jwt({ token, user, account, profile }: any) {
            if (account?.provider === "credentials" && user) {
                token.email = user.email;
                token.fullname = user.fullname;
                token.name = user.fullname || user.name || "";
                token.role = user.role;
            }

            if (account?.provider === "google" || account?.provider === "github") {
                const data = {
                    fullname: user.name,
                    email: user.email,
                    image: user.image,
                    type: account.provider,
                };
                
                await signInWithGoogle(data, async (response: any) => {
                    if (response.status) {
                        token.fullname = response.data.fullname;
                        token.email = response.data.email;
                        token.image = response.data.image;
                        token.type = response.data.type;
                        token.role = response.data.role;
                        console.log("DEBUG: Role dari Firestore ->", response.data.role);
                    }
                });
            
            };

            
            return token;
        },

        async session({ session, token }:any) {
            if (token.email) {
                session.user.email = token.email;
            }
            if (token.fullname) {
                session.user.fullname = token.fullname;
            }
            if (token.image) {
                session.user.image = token.image;
            }
            if (token.role) {
                session.user.role = token.role;
            }
            if (token.type) {
                session.user.type = token.type;
            }

            return session;
        }
    },

    pages: {
        signIn: "/auth/login",
    },
};

export default NextAuth(authOptions);


