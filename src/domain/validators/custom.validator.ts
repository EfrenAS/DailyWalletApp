type ValidationErrors<T> = Partial<Record<keyof T, string[]>>

export default class CustomValidator<T extends Record<string, any>> {
  private readonly errors: ValidationErrors<T> = {}
  private currentField!: keyof T
  private currentValue: unknown

  private readonly NULLISH = Object.freeze({
    NULL: null,
    UNDEFINED: undefined
  })

  private readonly EMAIL_REGEX = Object.freeze(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
  private readonly HEX24REGEX = Object.freeze(/^[a-fA-F0-9]{24}$/)

  private isOptional = false

  constructor (private readonly data: T) {}

  public field<K extends keyof T> (fieldName: K): CustomValidator<T> {
    this.currentField = fieldName
    this.currentValue = this.data[fieldName]
    return this
  }

  private assertFieldSelected (): void {
    if (this.currentField === undefined) {
      throw new Error('Must call field(...) before applying validation rules.')
    }
  }

  private addError (message: string): void {
    this.assertFieldSelected()

    const fieldErrors = this.errors[this.currentField] ?? []
    fieldErrors.push(message)
    this.errors[this.currentField] = fieldErrors
  }

  public optional (): this {
    this.assertFieldSelected()
    this.isOptional = this.currentValue === this.NULLISH.UNDEFINED || this.currentValue === this.NULLISH.NULL

    return this
  }

  public required (message: string = `${String(this.currentField)} is required`): this {
    this.assertFieldSelected()

    if (this.isOptional) return this

    const value = this.currentValue

    if (value === this.NULLISH.NULL || value === this.NULLISH.UNDEFINED || (typeof value === 'string' && value.trim() === '')) {
      this.addError(message)
    }

    return this
  }

  public isString (message: string = `${String(this.currentField)} must be a string`): this {
    this.assertFieldSelected()

    if (this.isOptional) return this

    const value = this.currentValue

    if (typeof value !== 'string') {
      this.addError(message)
    }

    return this
  }

  public isObjectId (message: string = `${String(this.currentField)} must be a valid ObjectId`): this {
    this.assertFieldSelected()

    const value = this.currentValue

    if (typeof value !== 'string' || !this.HEX24REGEX.test(value)) {
      this.addError(message)
    }

    return this
  }

  public length (length: number, message: string = `${String(this.currentField)} must be ${length} characters`): this {
    this.assertFieldSelected()

    if (this.isOptional) return this

    const value = this.currentValue

    if (typeof value !== 'string' || value.length !== length) {
      this.addError(message)
    }

    return this
  }

  public minLength (length: number, message: string = `${String(this.currentField)} must be at least ${length} characters`): this {
    this.assertFieldSelected()

    if (this.isOptional) return this

    const value = this.currentValue

    if (typeof value !== 'string' || value.length < length) {
      this.addError(message)
    }

    return this
  }

  public email (message: string = `${String(this.currentField)} must be a valid email`): this {
    this.assertFieldSelected()

    if (this.isOptional) return this

    const value = this.currentValue

    if (typeof value !== 'string' || !this.EMAIL_REGEX.test(value)) {
      this.addError(message)
    }

    return this
  }

  public isNumber (message: string = `${String(this.currentField)} must be a number`): this {
    this.assertFieldSelected()

    if (this.isOptional) return this

    const value = this.currentValue
    const valueNumber = Number(value)

    if (isNaN(valueNumber)) {
      this.addError(message)
    }

    return this
  }

  public isInteger (message: string = `${String(this.currentField)} must be an integer`): this {
    this.assertFieldSelected()

    if (this.isOptional) return this

    const value = this.currentValue
    const valueNumber = Number(value)

    if (!Number.isInteger(valueNumber)) {
      this.addError(message)
    }

    return this
  }

  public validate (): ValidationErrors<T> {
    return this.errors
  }
}
