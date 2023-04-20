class LinkedList {
    #list_storage = []


    length() {
        return this.#list_storage.length
    }

    append(elem) {
        if (typeof elem === "string") {
            this.#list_storage.push(elem)
        } else {
            throw new Error("Wrong input data type. Enter data with type string");
        }
    }

    insert(elem, index) {
        if (typeof elem === "string") {
            if (index < 0 || index >= this.#list_storage.length) {
                throw new Error("Invalid index")
            }
            this.#list_storage.splice(index, 0, elem)
        } else {
            throw new Error("Wrong input data type. Enter data with type string");
        }
    }

    delete(index) {
        if (index < 0 || index >= this.#list_storage.length) {
            throw new Error("Invalid index")
        }
        return this.#list_storage.splice(index, 1)[0]
    }

    deleteAll(key) {
        this.#list_storage = this.#list_storage.filter(elem => elem !== key)
    }

    get(index) {
        return (index >= 0 && this.#list_storage[index] !== undefined) ? this.#list_storage[index] : new Error("Invalid index")
    }

    clone() {
        let clonedList = new LinkedList()
        for (const key of this.#list_storage) {
            clonedList.append(key)
        }
        return clonedList
    }

    reverse() {
        this.#list_storage.reverse()
    }

    findFirst(elem) {
        return this.#list_storage.indexOf(elem)
    }

    findLast(elem) {
        return this.#list_storage.lastIndexOf(elem)
    }

    clear() {
        this.#list_storage = []
    }

    extend(list) {
        this.#list_storage.push(...list.getStorage)
    }

    get getStorage() {
        return this.#list_storage
    }
}

module.exports = LinkedList