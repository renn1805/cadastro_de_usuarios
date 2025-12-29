import { StatusTask } from "./enum/EnumTaskState";
import { DifficultTask } from "./enum/EnumTaskDifficult";
export default class Task {

    #taskId: number

    #taskName: string;
    get taskName() {
        return this.#taskName
    }

    #taskDescription: string;
    get taskDescription() {
        return this.#taskDescription
    }

    #taskState: StatusTask = StatusTask.Pending
    get taskState() {
        return this.#taskState
    }
    set changeTaskState(newState: StatusTask) {
        this.#taskState = newState
    }

    #taskDifficulty: DifficultTask = DifficultTask.Undefined
    get taskDifficulty() {
        return this.#taskDifficulty
    }
    set changeTaskDifficulty(newDifficulty: DifficultTask) {
        this.#taskDifficulty = newDifficulty
    }



    constructor(
        id: number,
        name: string,
        description: string,
        status: StatusTask,
        difficulty: DifficultTask
    ) {
        this.#taskId = id
        this.#taskName = name
        this.#taskDescription = description
        this.#taskDifficulty = difficulty
        this.#taskState = status
    }


    toJSON() {

        return {
            taskId: this.#taskId,
            taskName: this.#taskName,
            taskDescription: this.#taskDescription,
            taskState: this.#taskState,
            taskDifficulty: this.#taskDifficulty
        }
    }

}