import mongoose from "mongoose";
import { emailValidator, phoneValidator, passwordValidator } from '../helper/validator';
import * as accountKinds from '../constants/accountKind'

const schema = mongoose.Schema

const AccountPasswordSchema = new schema({
    password: {
        type: String,
        required: 'Password is required',
        validate: [passwordValidator, 'Please fill a valid password'],
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    }
})

const AccountSchema = new schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
        required: 'Name is required',
    },
    email: {
        type: String,
        required: 'Email address is required',
        validate: [emailValidator, 'Please fill a valid email address'],
        unique: [true, 'Email {VALUE} is already exists'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username {VALUE} is already exists'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        validate: [phoneValidator, 'Please fill a valid phone'],
        unique: [true, 'Phone {VALUE} is already exists'],
    },
    kind: {
        type: Number,
        default: accountKinds.accountKindBuyer,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    password: {
        type: AccountPasswordSchema,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    }
},
{ collection: 'accounts' })

export default mongoose.model("Account", AccountSchema)