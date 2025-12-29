import Task from "./Task";

export default class User {

    static #couterId = 1000

    #id: number
    get id() {
        return this.#id
    }


    #name: string;
    get name() {
        return this.#name
    }

    #email: string;
    get email() {
        return this.#email
    }

    #password: string;

    #userTasks: Task[] = []
    get userTasks() {
        return this.#userTasks
    }


    constructor(name: string, email: string, password: string) {
        User.#couterId++

        this.#id = User.#couterId
        this.#name = name.toLowerCase();
        this.#email = email.toLowerCase();
        this.#password = password

    };

    comparePassword(comparedPassword: string): Boolean {
        if (this.#password === comparedPassword) {
            return true
        } else {
            return false
        }
    }

    compareId(comparedId: number): boolean {
        if (this.#id === comparedId) {
            return true
        } else {
            return false
        }
    }

    compareEmail(comparedEmail: string): boolean {
        if (this.#email === comparedEmail) {
            return true
        } else {
            return false
        }
    }


    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            email: this.#email,
            tasks: this.#userTasks
        }
    }

}

export let Users: User[] = [
    new User(
        "Renan Almeida de Araujo",
        "renan.almeida.arau@gmail.com",
        "12345678"
    )
]