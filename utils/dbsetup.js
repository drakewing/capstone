// initialize datastore
const { Datastore } = require("@google-cloud/datastore");
const kinds = require("../src/utils/kinds");
const { gender } = require("../src/utils/gender");
const { species } = require("../src/utils/species");
const { breeds } = require("../src/utils/breeds");
const { availability } = require("../src/utils/availability");
const { dispositions } = require("../src/utils/dispositions");
const { User } = require("../src/models/user");
const { secrets } = require("../src/secrets");

// The ID of your GCS bucket
const bucketName =
  "https://storage.googleapis.com/capstone-project-318221.appspot.com/";

const datastore = new Datastore();

async function saveAnimal(newAnimal) {
  const animalKey = datastore.key(kinds.ANIMALS);
  await datastore.save({ key: animalKey, data: newAnimal });
  console.log(animalKey);
}

const animal1 = {};
animal1.Name = "Bucky";
animal1.Species = species.DOG;
animal1.Breed = breeds.Dog.CAVALIER_KING_CHARLES_SPANIEL;
animal1.Gender = gender.MALE;
animal1.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal1.Age = "1 year";
animal1.DateCreated = "2021-02-01";
animal1.Availability = availability.AVAILABLE;
animal1.Photo = `${bucketName}4736b745-d387-4582-9571-8bae8dc2a9d9.jpg`;

saveAnimal(animal1);

const animal2 = {};
animal2.Name = "Peanut";
animal2.Species = species.DOG;
animal2.Breed = breeds.Dog.YORKSHIRE_TERRIER;
animal2.Gender = gender.MALE;
animal2.Disposition = [
  dispositions.SPECIAL_NEEDS,
  dispositions.ADULTS_ONLY,
  dispositions.ANIMAL_MUST_BE_LEASHED_AT_ALL_TIMES,
];
animal2.Age = "6 years";
animal2.DateCreated = "2021-06-01";
animal2.Availability = availability.AVAILABLE;
animal2.Photo = `${bucketName}a982be7b-c6b1-4193-9820-5edd0a81df7f.jpg`;
saveAnimal(animal2);

const animal3 = {};
animal3.Name = "Mustafa";
animal3.Species = species.CAT;
animal3.Breed = breeds.Cat.AMERICAN_CURL;
animal3.Gender = gender.MALE;
animal3.Disposition = [
  dispositions.SOLO_ANIMAL,
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.SPECIAL_DIET,
];
animal3.Age = "5 years";
animal3.DateCreated = "2021-05-01";
animal3.Availability = availability.AVAILABLE;
animal3.Photo = `${bucketName}7b3626db-f659-499e-82a3-bf4a1a0c5c18.jpg`;
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
animal4.Photo = `${bucketName}eac6f4fd-95e8-4c4d-ba41-3e1839885eeb.jpg`;
saveAnimal(animal4);

const animal5 = {};
animal5.Name = "Ziva";
animal5.Species = species.DOG;
animal5.Breed = breeds.Dog.AUSTRALIAN_SHEPHERD;
animal5.Gender = gender.FEMALE;
animal5.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.SPECIAL_DIET,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal5.Age = "7 years";
animal5.DateCreated = "2021-04-01";
animal5.Availability = availability.PENDING;
animal5.Photo = `${bucketName}06a5dd5e-ab4d-4220-be5f-2624dbcebd0d.jpg`;
saveAnimal(animal5);

const animal6 = {};
animal6.Name = "Dobby";
animal6.Species = species.DOG;
animal6.Breed = breeds.Dog.BEAGLE;
animal6.Gender = gender.FEMALE;
animal6.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal6.Age = "4 years";
animal6.DateCreated = "2020-07-01";
animal6.Availability = availability.AVAILABLE;
animal6.Photo = `${bucketName}334e59fe-ed3c-4aba-90ef-9fb1b60c1d6c.jpg`;
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
animal7.Photo = `${bucketName}48870e69-c801-463f-a02f-757fac3a4cf1.jpg`;
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
animal8.Photo = `${bucketName}d08644ae-ccdd-4dd2-9925-3925020ca010.jpg`;
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
animal9.Photo = `${bucketName}79a85a72-2a47-47ad-b5ce-a33025e66fb6.jpg`;
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
animal10.Photo = `${bucketName}37d3f420-ae6c-4488-818d-429fa99979ee.jpg`;
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
animal11.Photo = `${bucketName}bf1cb62a-6c92-4d35-9bfd-bcce974d8d94.jpg`;
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
animal12.Photo = `${bucketName}b69ed461-8790-4ef8-86a8-a2b49d1d897c.jpg`;
saveAnimal(animal12);

const animal13 = {};
animal13.Name = "Nala";
animal13.Species = species.CAT;
animal13.Breed = breeds.Cat.BENGAL;
animal13.Gender = gender.FEMALE;
animal13.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.NEEDS_COMPANION,
];
animal13.Age = "9 years";
animal13.DateCreated = "2020-09-02";
animal13.Availability = availability.AVAILABLE;
animal13.Photo = `${bucketName}efb44010-4249-4cd4-8a33-8b8bc23ac4aa.jpg`;
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
animal14.Photo = `${bucketName}d4b8661e-1c94-478e-8fa3-267f7b13904d.jpg`;
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
aniaml15.Photo = `${bucketName}b732cda5-8993-4b73-ac7c-357648c1cecd.jpg`;
saveAnimal(aniaml15);

const animal16 = {};
animal16.Name = "Geico";
animal16.Species = species.OTHER;
animal16.Breed = breeds.Other.COMMON_LEOPARD_GECKO;
animal16.Gender = gender.MALE;
animal16.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
];
animal16.Age = "1 year";
animal16.DateCreated = "2021-07-01";
animal16.Availability = availability.AVAILABLE;
animal16.Photo = `${bucketName}09e94933-3e93-4122-9560-8639148fdb2d.jpg`;
saveAnimal(animal16);

const animal17 = {};
animal17.Name = "Fido";
animal17.Species = species.DOG;
animal17.Breed = breeds.Dog.LABRADOR;
animal17.Gender = gender.MALE;
animal17.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal17.Age = "5 years";
animal17.DateCreated = "2021-07-03";
animal17.Availability = availability.AVAILABLE;
animal17.Photo = `${bucketName}92d1eca8-142d-467f-88e6-1161db890908.jpg`;
saveAnimal(animal17);

const animal18 = {};
animal18.Name = "Lady";
animal18.Species = species.DOG;
animal18.Breed = breeds.Dog.CAVALIER_KING_CHARLES_SPANIEL;
animal18.Gender = gender.FEMALE;
animal18.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal18.Age = "5 years";
animal18.DateCreated = "2021-06-02";
animal18.Availability = availability.AVAILABLE;
animal18.Photo = `${bucketName}95401f95-9a89-4d4a-9279-301b054de9bf.jpg`;
saveAnimal(animal18);

const animal19 = {};
animal19.Name = "Tramp";
animal19.Species = species.DOG;
animal19.Breed = breeds.Dog.LABRADOR;
animal19.Gender = gender.MALE;
animal19.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal19.Age = "5 years";
animal19.DateCreated = "2021-05-02";
animal19.Availability = availability.AVAILABLE;
animal19.Photo = `${bucketName}2b96c2c0-2053-4515-af8d-52568582daf8.jpg`;
saveAnimal(animal19);

const animal20 = {};
animal20.Name = "Pongo";
animal20.Species = species.DOG;
animal20.Breed = breeds.Dog.LABRADOR;
animal20.Gender = gender.MALE;
animal20.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal20.Age = "5 years";
animal20.DateCreated = "2021-04-02";
animal20.Availability = availability.AVAILABLE;
animal20.Photo = `${bucketName}6f80a7ff-cdf5-46f5-b151-57da8c2fe7f0.jpg`;

saveAnimal(animal20);

const animal21 = {};
animal21.Name = "Lassie";
animal21.Species = species.DOG;
animal21.Breed = breeds.Dog.LABRADOR;
animal21.Gender = gender.FEMALE;
animal21.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal21.Age = "5 weeks";
animal21.DateCreated = "2021-03-02";
animal21.Availability = availability.AVAILABLE;
animal21.Photo = `${bucketName}c988a0cd-3702-4a65-87e2-9fcca97b50a0.jpg`;
saveAnimal(animal21);

const animal22 = {};
animal22.Name = "Beethoven";
animal22.Species = species.DOG;
animal22.Breed = breeds.Dog.LABRADOR;
animal22.Gender = gender.MALE;
animal22.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal22.Age = "5 years";
animal22.DateCreated = "2021-02-10";
animal22.Availability = availability.AVAILABLE;
animal22.Photo = `${bucketName}37ea1505-a5b8-4bb7-a1d6-38cba64fef16.jpg`;
saveAnimal(animal22);

const animal23 = {};
animal23.Name = "Benji";
animal23.Species = species.DOG;
animal23.Breed = breeds.Dog.FRENCH_BULLDOG;
animal23.Gender = gender.MALE;
animal23.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal23.Age = "5 years";
animal23.DateCreated = "2021-01-01";
animal23.Availability = availability.AVAILABLE;
animal23.Photo = `${bucketName}d2b96478-0145-4213-a57e-8ed5750cb95a.jpg`;
saveAnimal(animal23);

const animal24 = {};
animal24.Name = "Clifford";
animal24.Species = species.DOG;
animal24.Breed = breeds.Dog.PUG;
animal24.Gender = gender.MALE;
animal24.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal24.Age = "5 years";
animal24.DateCreated = "2021-07-02";
animal24.Availability = availability.AVAILABLE;
animal24.Photo = `${bucketName}152cf4ee-a642-4b20-88ae-829b490bc68a.jpg`;
saveAnimal(animal24);

const animal25 = {};
animal25.Name = "Old Yeller";
animal25.Species = species.DOG;
animal25.Breed = breeds.Dog.GERMAN_SHEPHERD;
animal25.Gender = gender.MALE;
animal25.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal25.Age = "5 years";
animal25.DateCreated = "2020-12-01";
animal25.Availability = availability.AVAILABLE;
animal25.Photo = `${bucketName}235d1723-50d5-447e-9509-ee86a95839ec.jpg`;
saveAnimal(animal25);

const animal26 = {};
animal26.Name = "Eddie Crane";
animal26.Species = species.DOG;
animal26.Breed = breeds.Dog.POODLE;
animal26.Gender = gender.MALE;
animal26.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal26.Age = "5 years";
animal26.DateCreated = "2020-11-01";
animal26.Availability = availability.AVAILABLE;
animal26.Photo = `${bucketName}b9d70adf-a9a6-4ae7-b24c-2484905fa9a7.jpg`;
saveAnimal(animal26);

const animal27 = {};
animal27.Name = "Perdita";
animal27.Species = species.DOG;
animal27.Breed = breeds.Dog.SIBERIAN_HUSKY;
animal27.Gender = gender.FEMALE;
animal27.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal27.Age = "5 years";
animal27.DateCreated = "2020-10-01";
animal27.Availability = availability.AVAILABLE;
animal27.Photo = `${bucketName}46145c12-8ee0-490a-ae78-ae73d5de599b.jpg`;
saveAnimal(animal27);

const animal28 = {};
animal28.Name = "Comet";
animal28.Species = species.DOG;
animal28.Breed = breeds.Dog.GOLDEN_RETREIVER;
animal28.Gender = gender.MALE;
animal28.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal28.Age = "5 years";
animal28.DateCreated = "2020-09-01";
animal28.Availability = availability.AVAILABLE;
animal28.Photo = `${bucketName}05688bd8-253d-4dad-8c29-3d12c75ce317.jpg`;
saveAnimal(animal28);

const animal29 = {};
animal29.Name = "Monty";
animal29.Species = species.DOG;
animal29.Breed = breeds.Dog.CORGI;
animal29.Gender = gender.MALE;
animal29.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal29.Age = "5 years";
animal29.DateCreated = "2020-08-02";
animal29.Availability = availability.AVAILABLE;
animal29.Photo = `${bucketName}4dc8a796-91f3-4724-80ef-09816710e178.jpg`;
saveAnimal(animal29);

const animal30 = {};
animal30.Name = "Scooby-Doo";
animal30.Species = species.DOG;
animal30.Breed = breeds.Dog.BORDER_COLLIE;
animal30.Gender = gender.MALE;
animal30.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal30.Age = "5 years";
animal30.DateCreated = "2020-07-02";
animal30.Availability = availability.AVAILABLE;
animal30.Photo = `${bucketName}17776fcc-8552-4123-83d6-0d44eeaa5382.jpg`;
saveAnimal(animal30);

const animal31 = {};
animal31.Name = "Snoopy";
animal31.Species = species.DOG;
animal31.Breed = breeds.Dog.BEAGLE;
animal31.Gender = gender.MALE;
animal31.Disposition = [
  dispositions.GOOD_WITH_CHILDREN,
  dispositions.ENERGETIC,
  dispositions.GOOD_WITH_OTHER_ANIMALS,
];
animal31.Age = "5 years";
animal31.DateCreated = "2020-06-01";
animal31.Availability = availability.AVAILABLE;
animal31.Photo = `${bucketName}955b8758-ede3-4e1a-9f3e-fd73f2e3eb1c.jpg`;
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

const buildUser = async (email, password) => {
  const user = new User();
  user.setEmail("admin@shelter.com");
  await user.setPassword(secrets.ADMIN_PASSWORD);
  user.save();
};
buildUser("admin@shelter.com", secrets.ADMIN_PASSWORD);
buildUser("johndoe@gmail.com", secrets.ADMIN_PASSWORD);
