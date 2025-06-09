import mongoose from 'mongoose'

interface ConnectionOptions {
  mongoUri: string
  dbName: string
}

export class MongoDatabase {
  static async connect (options: ConnectionOptions): Promise<boolean> {
    const { mongoUri, dbName } = options
    console.log('Connection is successfully')
    try {
      await mongoose.connect(mongoUri, { dbName })

      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
