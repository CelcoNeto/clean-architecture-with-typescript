import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'
import { EmailValidator } from '../presentation/protocols/email-validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const makeSut = (): EmailValidator => new EmailValidatorAdapter()
describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBeFalsy()
  })
  it('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@gmail.com')
    expect(isValid).toBeTruthy()
  })
  it('should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('valid_email@gmail.com')
    expect(isEmailSpy).toBeCalledWith('valid_email@gmail.com')
  })
})
