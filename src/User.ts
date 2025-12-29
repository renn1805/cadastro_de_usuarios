import Task from "./Task";

export default class User {

    static #counterId = 1000
    #id: number
    #name: string;
    #email: string;
    #password: string;
    #tasks: Task[] = []
    
    
    constructor(name: string, email: string, password: string) {
        User.#counterId++
        
        this.#id = User.#counterId
        this.#name = name.toLowerCase();
        this.#email = email.toLowerCase();
        this.#password = password
    };
    
    get id() {return this.#id}
    get name() {return this.#name}
    get email() {return this.#email}
    get tasks() {return this.#tasks}

    matchesPassword(comparedPassword: string): boolean {
        if (this.#password === comparedPassword) {
            return true
        } else {
            return false
        }
    }

    matchesId(comparedId: number): boolean {
        if (this.#id === comparedId) {
            return true
        } else {
            return false
        }
    }

    matchesEmail(comparedEmail: string): boolean {
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
            tasks: this.#tasks
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