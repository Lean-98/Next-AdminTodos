import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInEmailPassword } from '../actions/auth-actions'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    // Esto no es recomendado para usar en producción, ya que la creación del user tiene que ser en un formulario de creación de usuario
    // y NO cuando estoy tratando de hacer el login. Porque si tengo que hacer el login con un email que no existe lo va a crear en DB, y eso es
    // algo que no quiero hacer, en el login buscamos que el usuario ya sea creado.
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@email.us',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '*******',
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(
          credentials!.email,
          credentials!.password
        )

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          return null
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user })

      return true
    },
    async jwt({ token, user, account }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? 'not-email' },
      })

      // De esta forma puedo bloquear users en la DB
      if (dbUser?.isActive === false) {
        throw Error('User is not active')
      }

      token.roles = dbUser?.roles ?? ['not-roles']
      token.id = dbUser?.id ?? 'not-uuid'
      return token
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles
        session.user.id = token.id
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
