import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { authenticateUserHook } from '../hooks/authenticate-user'
import { getUserLevelAndExperience } from '../../functions/get-user-level-and-experience'

export const getUserExperienceAndLevelRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/profile/gamification',
      {
        onRequest: [authenticateUserHook],
        schema: {
          tags: ['users', 'gamification'],
          operationId: 'getUserExperienceAndLevel',
          description: 'Get user experience and level',
          response: {
            200: z.object({
              experience: z.number(),
              level: z.number(),
              experienceToNextLevel: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = request.user.sub

        const { experience, experienceToNextLevel, level } =
          await getUserLevelAndExperience({
            userId,
          })

        return reply
          .status(200)
          .send({ experience, experienceToNextLevel, level })
      }
    )
  }
