import { v4 as uuid } from 'uuid';

export const generateId = (prefix = "", sufix = ""): string => {
    let id = uuid()

    if (prefix != "") {
        id = prefix + id
    }

    if (sufix != "") {
        id += sufix
    }

    return id
}
