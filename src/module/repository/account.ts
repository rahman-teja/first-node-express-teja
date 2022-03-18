import mongoose from "mongoose";
import { account } from "../../entity/account"
import { mongoErrorBuilder } from "../../osError/builder"

export interface iAccountCommandRepository {
  Create(payload: account): Promise<account>
  Update(id: string, payload: account): Promise<account|null>
}

export interface iAccountQueryRepository {
  GetByID(id: string): Promise<account|null>
  GetByUsername(username: string): Promise<account|null>
}

export class accountRepository implements 
    iAccountCommandRepository, 
    iAccountQueryRepository {

    model: mongoose.Model<account>

    constructor(mdl: mongoose.Model<any>) {
        this.model = mdl;
    }
    
    async GetByID(id: string): Promise<account|null> {
        try {
            return await this.model.findById<account>(id)
        } catch (error) {
            throw mongoErrorBuilder(error)
        }
    }
    
    async GetByUsername(username: string): Promise<account|null> {
        try {
            const filter = {
                "$or": [
                    {"username": username},
                    {"email": username},
                    {"phone": username}
                ]
            }

            return await this.model.findOne<account>(filter)
        } catch (error) {
            throw mongoErrorBuilder(error)
        }
    }
    
    async Create(payload: account): Promise<account> {
        try {
            const res = await this.model.create(payload)

            return res.toObject<account>()
        } catch (error) {
            throw mongoErrorBuilder(error)
        }
    }

    async Update(id: string, payload: account): Promise<account|null> {
        try {
            return await this.model.findByIdAndUpdate<account>(id, payload)
        } catch (error) {
            throw mongoErrorBuilder(error)
        }
    }

}