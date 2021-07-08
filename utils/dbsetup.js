// initialize datastore
const { Datastore } = require('@google-cloud/datastore');
const kinds = require("../src/utils/kinds");

const datastore = new Datastore();

const species = [
  {
    type: "Dog",
    breeds: [
      "Australian Shepherd",
      "Beagle",
      "Border Collie",
      "Bulldog",
      "Cavalier King Charles Spaniel",
      "Corgi",
      "French Bulldog",
      "German Shepherd",
      "Golden Retreiver",
      "Poodle",
      "Pomeranian",
      "Pug",
      "Siberian Husky",
      "Yorkshire Terrier",
      "Other(Dog)",
    ],
  },
  {
    type: "Cat",
    breeds: [
      "American Curl",
      "Bengal",
      "British Shorthair",
      "Main Coon",
      "Munch",
      "Persian",
      "Ragdoll",
      "Siamese",
      "Sphynx",
      "Other(Cat)",
    ],
  },
  {
    type: "Other",
    breeds: [
      "Angora Rabbit",
      "English Spot Rabbit",
      "Common Leopard Gecko",
      "Other Breed",
    ],
  },
];

species.forEach((e) => {
  const key = datastore.key(kinds.SPECIES);
  datastore.save({ key, data: { type: e.type, breeds: e.breeds } });
});

const Disposition = [
  "Good with kids",
  "Special Needs",
  "Adults-only home",
  "Special dietary needs",
  "Energetic",
  "Needs companion animal",
  "No other animals in home",
];

const key = datastore.key(kinds.DISPOSITIONS);
datastore.save({ key, data: { Disposition } });

function saveAnimal(newAnimal) {
  const animalKey = datastore.key(kinds.ANIMALS);
  datastore.save({ key: animalKey, data: newAnimal });
}

const animal1 = {};
animal1.Name = "Bucky";
animal1.Species = "Dog";
animal1.Breed = "Cavalier King Charles Spaniel";
animal1.Gender = "Male";
animal1.Disposition = ["Good with kids", "Energetic"];
animal1.Age = "1 year";
animal1.DateCreated = "07/01/2021";
animal1.Availability = "Available";
saveAnimal(animal1);

const animal2 = {};
animal2.Name = "Peanut";
animal2.Species = "Dog";
animal2.Breed = "Yorkshire Terrier";
animal2.Gender = "Male";
animal2.Disposition = ["Special needs", "Adults-only home"];
animal2.Age = "6 years";
animal2.DateCreated = "04/01/2021";
animal2.Availability = "Available";
saveAnimal(animal2);

const animal3 = {};
animal3.Name = "Mustafa";
animal3.Species = "Cat";
animal3.Breed = "American Curl";
animal3.Gender = "Male";
animal3.Disposition = ["No other pets in home", "Good with kids", "Special dietary needs"];
animal3.Age = "5 years";
animal3.DateCreated = "01/01/2021";
animal3.Availability = "Available";
saveAnimal(animal3);

const animal4 = {};
animal4.Name = "Noel";
animal4.Species = "Rabbit";
animal4.Breed = "English Spot Rabbit";
animal4.Gender = "Female";
animal4.Disposition = ["Adults-only home", "Special dietary needs"];
animal4.Age = "8 years";
animal4.DateCreated = "07/01/2021";
animal4.Availability = "Available";
saveAnimal(animal4);

const animal5 = {};
animal5.Name = "Ziva";
animal5.Species = "Dog";
animal5.Breed = "Australian Shepherd";
animal5.Gender = "Female";
animal5.Disposition = ["Good with kids", "Special dietary needs", "High energy"];
animal5.Age = "7 years";
animal5.DateCreated = "06/01/2021";
animal5.Availability = "Available";
saveAnimal(animal5);

const animal6 = {};
animal6.Name = "Dobby";
animal6.Species = "Dog";
animal6.Breed = "Beagle";
animal6.Gender = "Female";
animal6.Disposition = ["Good with kids", "High energy"];
animal6.Age = "4 years";
animal6.DateCreated = "07/01/2020";
animal6.Availability = "Available";
saveAnimal(animal6);

const animal7 = {};
animal7.Name = "Mr. Fluffy";
animal7.Species = "Other";
animal7.Breed = "Angora Rabbit";
animal7.Gender = "Male";
animal7.Disposition = ["Adults-only home", "Special needs"];
animal7.Age = "10 years";
animal7.DateCreated = "08/01/2020";
animal7.Availability = "Available";
saveAnimal(animal7);

const animal8 = {};
animal8.Name = "Whiskers";
animal8.Species = "Cat";
animal8.Breed = "Sphynx";
animal8.Gender = "Female";
animal8.Disposition = ["Good with kids"];
animal8.Age = "6 months";
animal8.DateCreated = "03/01/2021";
animal8.Availability = "Available";
saveAnimal(animal8);

const animal9 = {};
animal9.Name = "Kylie";
animal9.Species = "Dog";
animal9.Breed = "Pomeranian";
animal9.Gender = "Male";
animal9.Disposition = ["Good with kids", "Energetic"];
animal9.Age = "12 years";
animal9.DateCreated = "06/01/2021";
animal9.Availability = "Available";
saveAnimal(animal9);

const animal10 = {};
animal10.Name = "Simba";
animal10.Species = "Cat";
animal10.Breed = "Bengal";
animal10.Gender = "Female";
animal10.Disposition = ["Good with kids"];
animal10.Age = "3 years";
animal10.DateCreated = "05/01/2021";
animal10.Availability = "Available";
saveAnimal(animal10);

const animal11 = {};
animal11.Name = "Tigger";
animal11.Species = "Cat";
animal11.Breed = "Persian";
animal11.Gender = "Female";
animal11.Disposition = ["Good with kids"];
animal11.Age = "8 years";
animal11.DateCreated = "02/01/2021";
animal11.Availability = "Available";
saveAnimal(animal11);

const animal12 = {};
animal12.Name = "Garfield";
animal12.Species = "Cat";
animal12.Breed = "Sphynx";
animal12.Gender = "Female";
animal12.Disposition = ["Good with kids"];
animal12.Age = "2 years";
animal12.DateCreated = "03/01/2021";
animal12.Availability = "Available";
saveAnimal(animal12);

const animal13 = {};
animal13.Name = "Nala";
animal13.Species = "Cat";
animal13.Breed = "Bengal";
animal13.Gender = "Female";
animal13.Disposition = ["Good with kids"];
animal13.Age = "9 years";
animal13.DateCreated = "09/01/2020";
animal13.Availability = "Available";
saveAnimal(animal13);

const animal14 = {};
animal14.Name = "Grumpy Cat";
animal14.Species = "Cat";
animal14.Breed = "Sphynx";
animal14.Gender = "Female";
animal14.Disposition = ["Good with kids"];
animal14.Age = "3 years";
animal14.DateCreated = "10/01/2019";
animal14.Availability = "Not Available";
saveAnimal(animal14);

const aniaml15 = {};
aniaml15.Name = "Cheshire";
aniaml15.Species = "Cat";
aniaml15.Breed = "Bengal";
aniaml15.Gender = "Female";
aniaml15.Disposition = ["Good with kids"];
aniaml15.Age = "5 years";
aniaml15.DateCreated = "01/01/2020";
aniaml15.Availability = "Adopted";
saveAnimal(aniaml15);

const animal16 = {};
animal16.Name = "Geico";
animal16.Species = "Other";
animal16.Breed = "Cavalier King Charles Spaniel";
animal16.Gender = "Male";
animal16.Disposition = ["Good with kids", "Energetic"];
animal16.Age = "1 year";
animal16.DateCreated = "07/01/2021";
animal16.Availability = "Available";
saveAnimal(animal16);
