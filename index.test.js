const LinkedList = require('./index.js');

describe('LinkedList', () => {
    describe('length', () => {
        test('should return 0 when list is empty', () => {
            const list = new LinkedList();
            expect(list.length()).toBe(0);
        });

        test('should return the length of the list when it contains elements', () => {
            const list = new LinkedList();
            list.append('one');
            list.append('two');
            list.append('three');
            expect(list.length()).toBe(3);
        });
    });
    describe('append', () => {
        test('should add a new node to the end of the list', () => {
            const list = new LinkedList();
            list.append('A');
            expect(list.get(0)).toBe('A');
            expect(list.length()).toBe(1);

            list.append('B');
            expect(list.get(1)).toBe('B');
            expect(list.length()).toBe(2);

            list.append('C');
            expect(list.get(2)).toBe('C');
            expect(list.length()).toBe(3);
        });
    });
    describe("insert", () => {
        let list;
        beforeEach(() => {
            list = new LinkedList();
            list.append("apple");
            list.append("banana");
            list.append("orange");
        });

        test("should insert an element at index 0", () => {
            list.insert("mango", 0);
            expect(list.get(0)).toBe("mango");
            expect(list.get(1)).toBe("apple");
            expect(list.length()).toBe(4);
        });

        test("should insert an element at a middle index", () => {
            list.insert("mango", 1);
            expect(list.get(1)).toBe("mango");
            expect(list.get(2)).toBe("banana");
            expect(list.get(3)).toBe("orange");
            expect(list.length()).toBe(4);
        });
    });
    describe('delete', () => {
        let list;

        beforeEach(() => {
            list = new LinkedList();
            list.append("apple");
            list.append("banana");
            list.append("orange");
        });

        test('removes the first element', () => {
            list.delete(0);
            expect(list.length()).toBe(2);
            expect(list.get(0)).toBe("banana");
        });

        test('removes the last element', () => {
            list.delete(2);
            expect(list.length()).toBe(2);
            expect(list.get(1)).toBe("banana");
        });

        test('removes an element from the middle', () => {
            list.delete(1);
            expect(list.length()).toBe(2);
            expect(list.get(0)).toBe("apple");
            expect(list.get(1)).toBe("orange");
        });
    });
    describe('deleteAll', () => {
        let list;

        beforeEach(() => {
            list = new LinkedList();
        });

        test('should remove all nodes with the specified value', () => {
            list.append('apple');
            list.append('banana');
            list.append('orange');
            list.append('apple');
            list.append('grape');
            list.append('apple');

            list.deleteAll('apple');

            expect(list.length()).toBe(3);
            expect(list.get(0)).toBe('banana');
            expect(list.get(1)).toBe('orange');
            expect(list.get(2)).toBe('grape');
        });

        test('should not modify the list when given a key not present in the list', () => {
            list.append('apple');
            list.append('banana');
            list.append('orange');

            list.deleteAll('grape');

            expect(list.length()).toBe(3);
            expect(list.get(0)).toBe('apple');
            expect(list.get(1)).toBe('banana');
            expect(list.get(2)).toBe('orange');
        });

        test('should return undefined when given an empty list', () => {
            expect(list.deleteAll('apple')).toBeUndefined();
        });
    });
    describe('get', () => {
        test('should return the first element when index is 0', () => {
            const list = new LinkedList();
            list.append('a');
            list.append('b');
            expect(list.get(0)).toBe('a');
        });

        test('should return the last element when index is size - 1', () => {
            const list = new LinkedList();
            list.append('a');
            list.append('b');
            list.append('c');
            expect(list.get(list.length() - 1)).toBe('c');
        });

        test('should return the correct element when index is in the middle of the list', () => {
            const list = new LinkedList();
            list.append('a');
            list.append('b');
            list.append('c');
            list.append('d');
            list.append('e');
            expect(list.get(2)).toBe('c');
        });
    });
    describe('clone', () => {
        test('modifying the original list does not affect the clone', () => {
            const list = new LinkedList()
            list.append('A')
            list.append('B')
            list.append('C')
            const clone = list.clone()
            list.delete(1)
            expect(list.length()).toBe(2)
            expect(clone.length()).toBe(3)
            expect(clone.get(0)).toBe('A')
            expect(clone.get(1)).toBe('B')
            expect(clone.get(2)).toBe('C')
        })

        test('modifying the clone does not affect the original list', () => {
            const list = new LinkedList()
            list.append('A')
            list.append('B')
            list.append('C')
            const clone = list.clone()
            clone.delete(1)
            expect(list.length()).toBe(3)
            expect(clone.length()).toBe(2)
            expect(list.get(0)).toBe('A')
            expect(list.get(1)).toBe('B')
            expect(list.get(2)).toBe('C')
        })

        test('returns a new instance of LinkedList', () => {
            const list = new LinkedList()
            list.append('A')
            list.append('B')
            list.append('C')
            const clone = list.clone()
            expect(clone).toBeInstanceOf(LinkedList)
        })
    })
    describe('LinkedList.reverse', () => {
        let list;

        beforeEach(() => {
            list = new LinkedList();
            list.append('first');
            list.append('second');
            list.append('third');
        });

        test('should reverse the order of the elements in the list', () => {
            list.reverse();
            expect(list.get(0)).toBe('third');
            expect(list.get(1)).toBe('second');
            expect(list.get(2)).toBe('first');
        });

        test('should update the head and tail properties of the list', () => {
            const originalHead = list.head;
            const originalTail = list.tail;
            list.reverse();
            expect(list.head).toBe(originalTail);
            expect(list.tail).toBe(originalHead);
        });

        test('should handle a list with only one element', () => {
            list.clear();
            list.append('one');
            list.reverse();
            expect(list.get(0)).toBe('one');
        });

        test('should handle an empty list', () => {
            list.clear();
            list.reverse();
            expect(list.length()).toBe(0);
        });

        test('should handle a list with repeated elements', () => {
            list.clear();
            list.append('a');
            list.append('b');
            list.append('b');
            list.append('c');
            list.append('b');
            list.append('d');
            list.append('b');
            list.reverse();
            expect(list.get(0)).toBe('b');
            expect(list.get(1)).toBe('d');
            expect(list.get(2)).toBe('b');
            expect(list.get(3)).toBe('c');
            expect(list.get(4)).toBe('b');
            expect(list.get(5)).toBe('b');
            expect(list.get(6)).toBe('a');
        });
    });
    describe('findFirst method', () => {
        let list;
        beforeEach(() => {
            list = new LinkedList();
        });

        test('should return -1 for empty list', () => {
            expect(list.findFirst('abc')).toBe(-1);
        });

        test('should return -1 if element is not found', () => {
            list.append('abc');
            list.append('def');
            expect(list.findFirst('ghi')).toBe(-1);
        });

        test('should return 0 if element is found at head', () => {
            list.append('abc');
            list.append('def');
            expect(list.findFirst('abc')).toBe(0);
        });

        test('should return index if element is found in the middle of list', () => {
            list.append('abc');
            list.append('def');
            list.append('ghi');
            expect(list.findFirst('def')).toBe(1);
        });

        test('should return index if element is found at the end of list', () => {
            list.append('abc');
            list.append('def');
            expect(list.findFirst('def')).toBe(1);
        });

        test('should return 0 if list has only one element and it is the searched element', () => {
            list.append('abc');
            expect(list.findFirst('abc')).toBe(0);
        });
    });
    describe('findLast', () => {
        let list;

        beforeEach(() => {
            list = new LinkedList();
            list.append('apple');
            list.append('banana');
            list.append('cherry');
            list.append('date');
            list.append('apple');
        });

        test('returns the correct index when the element is found at the end', () => {
            const index = list.findLast('apple');
            expect(index).toBe(4);
        });

        test('returns the correct index when the element is found in the middle', () => {
            const index = list.findLast('banana');
            expect(index).toBe(1);
        });

        test('returns the correct index when the element is found at the beginning', () => {
            const index = list.findLast('cherry');
            expect(index).toBe(2);
        });

        test('returns -1 when the element is not found', () => {
            const index = list.findLast('grape');
            expect(index).toBe(-1);
        });

        test('returns the correct index when there is only one element in the list', () => {
            list.clear();
            list.append('apple');
            const index = list.findLast('apple');
            expect(index).toBe(0);
        });

        test('returns -1 when the input is not a string', () => {
            const index = list.findLast(123);
            expect(index).toBe(-1);
        });
    });
    describe("findLast", () => {
        let list;

        beforeEach(() => {
            list = new LinkedList();
            list.append("apple");
            list.append("banana");
            list.append("cherry");
            list.append("date");
            list.append("elderberry");
            list.append("fig");
        });

        afterEach(() => {
            list.clear();
        });

        test("returns the index of the last node with the specified value", () => {
            expect(list.findLast("apple")).toBe(0);
            expect(list.findLast("banana")).toBe(1);
            expect(list.findLast("cherry")).toBe(2);
            expect(list.findLast("date")).toBe(3);
            expect(list.findLast("elderberry")).toBe(4);
            expect(list.findLast("fig")).toBe(5);
        });

        test("returns -1 if no node with the specified value is found", () => {
            expect(list.findLast("grape")).toBe(-1);
            expect(list.findLast("watermelon")).toBe(-1);
        });

        test("returns the index of the last node with the specified value even if the value appears multiple times", () => {
            list.append("banana");
            list.append("date");

            expect(list.findLast("apple")).toBe(0);
            expect(list.findLast("banana")).toBe(6);
            expect(list.findLast("cherry")).toBe(2);
            expect(list.findLast("date")).toBe(7);
            expect(list.findLast("elderberry")).toBe(4);
            expect(list.findLast("fig")).toBe(5);
        });

        test("returns the index of the last node with the specified value even if the list contains only one node", () => {
            list.clear();
            list.append("apple");

            expect(list.findLast("apple")).toBe(0);
        });

        test("returns -1 if the specified value is not a string", () => {
            expect(list.findLast(1)).toBe(-1);
            expect(list.findLast(true)).toBe(-1);
            expect(list.findLast({})).toBe(-1);
            expect(list.findLast([])).toBe(-1);
            expect(list.findLast(null)).toBe(-1);
            expect(list.findLast(undefined)).toBe(-1);
        });
    });
    describe('extend', () => {
        test('should add the elements of the given list to the end of the current list', () => {
            const list1 = new LinkedList();
            list1.append('a');
            list1.append('b');
            list1.append('c');

            const list2 = new LinkedList();
            list2.append('d');
            list2.append('e');
            list2.append('f');

            list1.extend(list2);

            expect(list1.length()).toBe(6);
            expect(list1.get(3)).toBe('d');
            expect(list1.get(4)).toBe('e');
            expect(list1.get(5)).toBe('f');
        });

        test('should do nothing if the given list is empty', () => {
            const list1 = new LinkedList();
            list1.append('a');
            list1.append('b');

            const list2 = new LinkedList();

            list1.extend(list2);

            expect(list1.length()).toBe(2);
            expect(list1.get(0)).toBe('a');
            expect(list1.get(1)).toBe('b');
        });

        test('should handle the case when the current list is empty', () => {
            const list1 = new LinkedList();

            const list2 = new LinkedList();
            list2.append('a');
            list2.append('b');
            list2.append('c');

            list1.extend(list2);

            expect(list1.length()).toBe(3);
            expect(list1.get(0)).toBe('a');
            expect(list1.get(1)).toBe('b');
            expect(list1.get(2)).toBe('c');
        });


        test('should handle the case when the given list has only one element', () => {
            const list1 = new LinkedList();
            list1.append('a');
            list1.append('b');
            list1.append('c');

            const list2 = new LinkedList();
            list2.append('d');

            list1.extend(list2);

            expect(list1.length()).toBe(4);
            expect(list1.get(3)).toBe('d');
        });
    });
});
