class Person {
  name: string;
  age: number;

  constructor(theName: string, theAge: number) {
    this.name = theName;
    this.age = theAge;
  }
}

const people: Person[] = [];

people.push(new Person('Alefe Souza', 20));
people.push(new Person('Ada Lovelace', 36));
people.push(new Person('Charles Babbage', 79));
people.push(new Person('Alan Turing', 41));
people.push(new Person('Dennis Ritchie', 70));

for (const person of people) {
  console.log(person.name);
}
