import { describe, it, expect, vi } from 'vitest'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeUser } from '../../tests/factories/make-user'
import { createGoalCompletion } from './create-goal-completion'
import { beforeEach } from 'node:test'
import { authenticateFromGithubCode } from './authenticate-from-github-code'
import * as github from '../modules/github-oauth'
import { db } from '../db'
import { users } from '../db/schema'
import { and, eq, ne } from 'drizzle-orm'
import { faker } from '@faker-js/faker'

describe('authenticate from github code', () => {
  beforeEach(() => {
    vi.mock('../modules/github-oauth')

    vi.clearAllMocks()
  })

  it('should be able to authenticate from github code', async () => {
    vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValue({
      id: 12345,
      name: 'John Doe',
      email: null,
      avatar_url: 'https://github.com/omarcolombari.png',
    })

    const sut = await authenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.externalAccountId, 12345))

    expect(userOnDb.name).toEqual('John Doe')
  })

  it('should be able to authenticate with existing github user', async () => {
    const existing = await makeUser({
      name: 'Jane Doe',
    })

    await db
      .delete(users)
      .where(
        and(
          eq(users.externalAccountId, existing.externalAccountId),
          ne(users.id, existing.id)
        )
      )

    vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValue({
      id: existing.externalAccountId,
      name: 'John Doe',
      email: null,
      avatar_url: 'https://github.com/omarcolombari.png',
    })

    const sut = await authenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.externalAccountId, existing.externalAccountId))

    expect(userOnDb.name).toEqual('Jane Doe')
  })
})
