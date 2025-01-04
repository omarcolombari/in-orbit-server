import { describe, it, expect } from 'vitest'
import { makeGoal } from '../../tests/factories/make-goal'
import { createGoal } from './create-goal'
import { makeUser } from '../../tests/factories/make-user'

describe('create goal', () => {
  it('should be able to create a goal', async () => {
    const user = await makeUser()

    const result = await createGoal({
      title: 'Example goal',
      desiredWeeklyFrequency: 5,
      userId: user.id,
    })

    expect(result).toEqual({
      goal: expect.objectContaining({
        id: expect.any(String),
        title: 'Example goal',
        desiredWeeklyFrequency: 5,
      }),
    })
  })
})
