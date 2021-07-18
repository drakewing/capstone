// initialize datastore
const { Datastore } = require("@google-cloud/datastore");
const kinds = require("../src/utils/kinds");
const { gender } = require("../src/utils/gender");
const { species } = require("../src/utils/species");
const { breeds } = require("../src/utils/breeds");
const { availability } = require("../src/utils/availability");
const { dispositions } = require("../src/utils/dispositions");

const datastore = new Datastore();

function saveAnimal(newAnimal) {
  const animalKey = datastore.key(kinds.ANIMALS);
  datastore.save({ key: animalKey, data: newAnimal });
}

const animal1 = {};
animal1.Name = "Bucky";
animal1.Species = species.DOG;
animal1.Breed = breeds.Dog.CAVALIER_KING_CHARLES_SPANIEL;
animal1.Gender = gender.MALE;
animal1.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal1.Age = "1 year";
animal1.DateCreated = "2021-02-01";
animal1.Availability = availability.AVAILABLE;
saveAnimal(animal1);

const animal2 = {};
animal2.Name = "Peanut";
animal2.Species = species.DOG;
animal2.Breed = breeds.Dog.YORKSHIRE_TERRIER;
animal2.Gender = gender.MALE;
animal2.Disposition = [dispositions.SPECIAL_NEEDS, dispositions.ADULTS_ONLY,
  dispositions.ANIMAL_MUST_BE_LEASHED_AT_ALL_TIMES];
animal2.Age = "6 years";
animal2.DateCreated = "2021-06-01";
animal2.Availability = availability.AVAILABLE;
saveAnimal(animal2);

const animal3 = {};
animal3.Name = "Mustafa";
animal3.Species = species.CAT;
animal3.Breed = breeds.Cat.AMERICAN_CURL;
animal3.Gender = gender.MALE;
animal3.Disposition = [dispositions.SOLO_ANIMAL, dispositions.GOOD_WITH_CHILDREN,
  dispositions.SPECIAL_DIET];
animal3.Age = "5 years";
animal3.DateCreated = "2021-05-01";
animal3.Availability = availability.AVAILABLE;
saveAnimal(animal3);

const animal4 = {};
animal4.Name = "Noel";
animal4.Species = species.OTHER;
animal4.Breed = breeds.Other.ENGLISH_SPOT_RABBIT;
animal4.Gender = gender.FEMALE;
animal4.Disposition = [dispositions.ADULTS_ONLY, dispositions.SPECIAL_DIET];
animal4.Age = "8 years";
animal4.DateCreated = "2021-03-03";
animal4.Availability = availability.AVAILABLE;
saveAnimal(animal4);

const animal5 = {};
animal5.Name = "Ziva";
animal5.Species = species.DOG;
animal5.Breed = breeds.Dog.AUSTRALIAN_SHEPHERD;
animal5.Gender = gender.FEMALE;
animal5.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.SPECIAL_DIET,
  dispositions.ENERGETIC, dispositions.GOOD_WITH_OTHER_ANIMALS];
animal5.Age = "7 years";
animal5.DateCreated = "2021-04-01";
animal5.Availability = availability.PENDING;
saveAnimal(animal5);

const animal6 = {};
animal6.Name = "Dobby";
animal6.Species = species.DOG;
animal6.Breed = breeds.Dog.BEAGLE;
animal6.Gender = gender.FEMALE;
animal6.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal6.Age = "4 years";
animal6.DateCreated = "2020-07-01";
animal6.Availability = availability.AVAILABLE;
saveAnimal(animal6);

const animal7 = {};
animal7.Name = "Mr. Fluffy";
animal7.Species = species.OTHER;
animal7.Breed = breeds.Other.ANGORA_RABBIT;
animal7.Gender = gender.MALE;
animal7.Disposition = [dispositions.ADULTS_ONLY, dispositions.SPECIAL_NEEDS];
animal7.Age = "10 years";
animal7.DateCreated = "2020-08-01";
animal7.Availability = availability.AVAILABLE;
saveAnimal(animal7);

const animal8 = {};
animal8.Name = "Whiskers";
animal8.Species = species.CAT;
animal8.Breed = breeds.Other.OTHER;
animal8.Gender = gender.FEMALE;
animal8.Disposition = [dispositions.GOOD_WITH_CHILDREN];
animal8.Age = "6 months";
animal8.DateCreated = "2021-02-15";
animal8.Availability = availability.AVAILABLE;
saveAnimal(animal8);

const animal9 = {};
animal9.Name = "Kylie";
animal9.Species = species.DOG;
animal9.Breed = breeds.Dog.POMERANIAN;
animal9.Gender = gender.MALE;
animal9.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC];
animal9.Age = "12 years";
animal9.DateCreated = "2021-02-03";
animal9.Availability = availability.PENDING;
saveAnimal(animal9);

const animal10 = {};
animal10.Name = "Simba";
animal10.Species = species.CAT;
animal10.Breed = breeds.Cat.BENGAL;
animal10.Gender = gender.FEMALE;
animal10.Disposition = [dispositions.GOOD_WITH_CHILDREN];
animal10.Age = "3 years";
animal10.DateCreated = "2021-02-20";
animal10.Availability = availability.AVAILABLE;
saveAnimal(animal10);

const animal11 = {};
animal11.Name = "Tigger";
animal11.Species = species.CAT;
animal11.Breed = breeds.Cat.PERSIAN;
animal11.Gender = gender.FEMALE;
animal11.Disposition = [dispositions.GOOD_WITH_CHILDREN];
animal11.Age = "8 years";
animal11.DateCreated = "2021-01-04";
animal11.Availability = availability.PENDING;
saveAnimal(animal11);

const animal12 = {};
animal12.Name = "Garfield";
animal12.Species = species.CAT;
animal12.Breed = breeds.Cat.SPHYNX;
animal12.Gender = gender.FEMALE;
animal12.Disposition = [dispositions.GOOD_WITH_CHILDREN];
animal12.Age = "2 years";
animal12.DateCreated = "2021-03-01";
animal12.Availability = availability.AVAILABLE;
saveAnimal(animal12);

const animal13 = {};
animal13.Name = "Nala";
animal13.Species = species.CAT;
animal13.Breed = breeds.Cat.BENGAL;
animal13.Gender = gender.FEMALE;
animal13.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.NEEDS_COMPANION];
animal13.Age = "9 years";
animal13.DateCreated = "2020-09-02";
animal13.Availability = availability.AVAILABLE;
saveAnimal(animal13);

const animal14 = {};
animal14.Name = "Grumpy Cat";
animal14.Species = species.CAT;
animal14.Breed = breeds.Cat.RAGDOLL;
animal14.Gender = gender.FEMALE;
animal14.Disposition = [dispositions.GOOD_WITH_CHILDREN];
animal14.Age = "3 years";
animal14.DateCreated = "2019-10-01";
animal14.Availability = availability.NOT_AVAILABLE;
saveAnimal(animal14);

const aniaml15 = {};
aniaml15.Name = "Cheshire";
aniaml15.Species = species.CAT;
aniaml15.Breed = breeds.Cat.SIAMESE;
aniaml15.Gender = gender.FEMALE;
aniaml15.Disposition = [dispositions.GOOD_WITH_CHILDREN];
aniaml15.Age = "5 years";
aniaml15.DateCreated = "2020-01-01";
aniaml15.Availability = availability.ADOPTED;
saveAnimal(aniaml15);

const animal16 = {};
animal16.Name = "Geico";
animal16.Species = species.OTHER;
animal16.Breed = breeds.Other.COMMON_LEOPARD_GECKO;
animal16.Gender = gender.MALE;
animal16.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC];
animal16.Age = "1 year";
animal16.DateCreated = "2021-07-01";
animal16.Availability = availability.AVAILABLE;
saveAnimal(animal16);

const animal17 = {};
animal17.Name = "Fido";
animal17.Species = species.DOG;
animal17.Breed = breeds.Dog.LABRADOR;
animal17.Gender = gender.MALE;
animal17.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal17.Age = "5 years";
animal17.DateCreated = "2021-07-01";
animal17.Availability = availability.AVAILABLE;
saveAnimal(animal17);

const animal18 = {};
animal18.Name = "Lady";
animal18.Species = species.DOG;
animal18.Breed = breeds.Dog.LABRADOR;
animal18.Gender = gender.FEMALE;
animal18.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal18.Age = "5 years";
animal18.DateCreated = "2021-06-02";
animal18.Availability = availability.AVAILABLE;
saveAnimal(animal18);

const animal19 = {};
animal19.Name = "Tramp";
animal19.Species = species.DOG;
animal19.Breed = breeds.Dog.LABRADOR;
animal19.Gender = gender.MALE;
animal19.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal19.Age = "5 years";
animal19.DateCreated = "2021-05-02";
animal19.Availability = availability.AVAILABLE;
saveAnimal(animal19);

const animal20 = {};
animal20.Name = "Pongo";
animal20.Species = species.DOG;
animal20.Breed = breeds.Dog.LABRADOR;
animal20.Gender = gender.MALE;
animal20.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal20.Age = "5 years";
animal20.DateCreated = "2021-04-02";
animal20.Availability = availability.AVAILABLE;
saveAnimal(animal20);

const animal21 = {};
animal21.Name = "Lassie";
animal21.Species = species.DOG;
animal21.Breed = breeds.Dog.LABRADOR;
animal21.Gender = gender.FEMALE;
animal21.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal21.Age = "5 years";
animal21.DateCreated = "2021-03-02";
animal21.Availability = availability.AVAILABLE;
saveAnimal(animal21);

const animal22 = {};
animal22.Name = "Beethoven";
animal22.Species = species.DOG;
animal22.Breed = breeds.Dog.LABRADOR;
animal22.Gender = gender.MALE;
animal22.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal22.Age = "5 years";
animal22.DateCreated = "2021-02-10";
animal22.Availability = availability.AVAILABLE;
saveAnimal(animal22);

const animal23 = {};
animal23.Name = "Benji";
animal23.Species = species.DOG;
animal23.Breed = breeds.Dog.LABRADOR;
animal23.Gender = gender.MALE;
animal23.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal23.Age = "5 years";
animal23.DateCreated = "2021-01-01";
animal23.Availability = availability.AVAILABLE;
saveAnimal(animal23);

const animal24 = {};
animal24.Name = "Clifford";
animal24.Species = species.DOG;
animal24.Breed = breeds.Dog.LABRADOR;
animal24.Gender = gender.MALE;
animal24.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal24.Age = "5 years";
animal24.DateCreated = "2021-07-01";
animal24.Availability = availability.AVAILABLE;
saveAnimal(animal24);

const animal25 = {};
animal25.Name = "Old Yeller";
animal25.Species = species.DOG;
animal25.Breed = breeds.Dog.LABRADOR;
animal25.Gender = gender.MALE;
animal25.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal25.Age = "5 years";
animal25.DateCreated = "2020-12-01";
animal25.Availability = availability.AVAILABLE;
saveAnimal(animal25);

const animal26 = {};
animal26.Name = "Eddie Crane";
animal26.Species = species.DOG;
animal26.Breed = breeds.Dog.LABRADOR;
animal26.Gender = gender.MALE;
animal26.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal26.Age = "5 years";
animal26.DateCreated = "2020-11-01";
animal26.Availability = availability.AVAILABLE;
saveAnimal(animal26);

const animal27 = {};
animal27.Name = "Perdita";
animal27.Species = species.DOG;
animal27.Breed = breeds.Dog.LABRADOR;
animal27.Gender = gender.FEMALE;
animal27.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal27.Age = "5 years";
animal27.DateCreated = "2020-10-01";
animal27.Availability = availability.AVAILABLE;
saveAnimal(animal27);

const animal28 = {};
animal28.Name = "Comet";
animal28.Species = species.DOG;
animal28.Breed = breeds.Dog.LABRADOR;
animal28.Gender = gender.MALE;
animal28.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal28.Age = "5 years";
animal28.DateCreated = "2020-09-01";
animal28.Availability = availability.AVAILABLE;
saveAnimal(animal28);

const animal29 = {};
animal29.Name = "Monty";
animal29.Species = species.DOG;
animal29.Breed = breeds.Dog.CORGI;
animal29.Gender = gender.MALE;
animal29.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal29.Age = "5 years";
animal29.DateCreated = "2020-08-02";
animal29.Availability = availability.AVAILABLE;
saveAnimal(animal29);

const animal30 = {};
animal30.Name = "Scooby-Doo";
animal30.Species = species.DOG;
animal30.Breed = breeds.Dog.LABRADOR;
animal30.Gender = gender.MALE;
animal30.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal30.Age = "5 years";
animal30.DateCreated = "2020-07-02";
animal30.Availability = availability.AVAILABLE;
saveAnimal(animal30);

const animal31 = {};
animal31.Name = "Snoopy";
animal31.Species = species.DOG;
animal31.Breed = breeds.Dog.BEAGLE;
animal31.Gender = gender.MALE;
animal31.Disposition = [dispositions.GOOD_WITH_CHILDREN, dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS];
animal31.Age = "5 years";
animal31.DateCreated = "2020-06-01";
animal31.Availability = availability.AVAILABLE;
saveAnimal(animal31);

function saveUser(newUser) {
  const userKey = datastore.key(kinds.USERS);
  datastore.save({ key: userKey, data: newUser });
}

const user1 = {
  name: "Jane Doe",
  email: "janedoe@gmail.com",
  password: "asdfoweifjwoiefawpeoviaweoviajewovijwpovij",
};
saveUser(user1);

const user2 = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  password: "asdfoweifjwoiefawpeoviaweoviajewovijwpovij",
};
saveUser(user2);
