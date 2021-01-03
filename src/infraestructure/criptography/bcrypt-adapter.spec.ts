import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash_value')
  }
}))
const salt = 12
const makeSut = (): BcryptAdapter => new BcryptAdapter(salt)
describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash_value')
  })

  it('Should return throws if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
