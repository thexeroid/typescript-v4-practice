// M2 boss — phone book. Rules: no `as`, check optional fields, annotate params, let return types be inferred.
// Run:  node --experimental-transform-types m2-phonebook/phonebook.ts

// 1. types: Contact, PhoneBook, Call
type Contact = { phone: string; email?: string };
type PhoneBook = Record<string, Contact>;
type Call = [name: string, minutes: number];

const isContact = (x: unknown): x is Contact => {
  if (typeof x !== "object" || x === null) return false;
  if (
    !("phone" in x) ||
    typeof x.phone !== "string" ||
    ("email" in x &&
      typeof x.email !== "string" &&
      typeof x.email !== "undefined")
  )
    return false;

  return true;
};

// 2. functions: emailOf(book, name), totalMinutes(calls, name), topCaller(calls)
function emailOf(book: PhoneBook, name: string) {
  const contact = book[name];
  if (!isContact(contact)) return undefined;

  return contact.email;
}

function totalMinutes(calls: Call[], name: string) {
  return calls
    .filter(([person]) => person === name)
    .reduce((acc, [, minutes]) => acc + minutes, 0);
}

type PersonMinutes = Record<string, number>;

function topCaller(calls: Call[]) {
  if (!calls.length) return undefined;

  const personMinutes = calls.reduce((acc: PersonMinutes, [person, minute]) => {
    acc[person] ??= 0;
    acc[person] += minute;

    return acc;
  }, {});

  return Object.entries(personMinutes).reduce(
    (max, [currPerson, currMinutes]) => {
      if (currMinutes > max.minutes) {
        max.minutes = currMinutes;
        max.person = currPerson;
      }

      return max;
    },
    {
      person: "",
      minutes: -Infinity,
    },
  ).person;
}
// 3. try it
