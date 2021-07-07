// initialize datastore
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();

const Animals = {
  Species: [
    {
      Dog: [
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
        "Other",
      ],
    },
    {
      Cat: [
        "American Curl",
        "Bengal",
        "British Shorthair",
        "Main Coon",
        "Munch",
        "Persian",
        "Ragdoll",
        "Siamese",
        "Sphynx",
        "Other",
      ],
    },
    {
      Other: [
        "Angora Rabbit",
        "English Spot Rabbit",
        "Common Leopard Gecko",
        "Other",
      ],
    },
  ],
};

const Disposition = [
  "Good with kids",
  "Special Needs",
  "Adults-only home",
  "Special dietary needs",
  "Energetic",
  "Needs companion animal",
  "No other animals in home",
];

function savePet(newPet) {
  const PETS = "Pets";
  const key = datastore.key(PETS);
  datastore.save({ key, data: newPet });
}

const pet1 = {};
pet1.Name = "Bucky";
pet1.Species = "Dog";
pet1.Breed = "Cavalier King Charles Spaniel";
pet1.Gender = "Male";
pet1.Disposition = ["Good with kids", "Energetic"];
pet1.Age = "1 year";
pet1.DateCreated = "07/01/2021";
pet1.Availability = "Available";
savePet(pet1);

const pet2 = {};
pet2.Name = "Peanut";
pet2.Species = "Dog";
pet2.Breed = "Yorkshire Terrier";
pet2.Gender = "Male";
pet2.Disposition = ["Special needs", "Adults-only home"];
pet2.Age = "6 years";
pet2.DateCreated = "04/01/2021";
pet2.Availability = "Available";
savePet(pet2);

const pet3 = {};
pet3.Name = "Mustafa";
pet3.Species = "Cat";
pet3.Breed = "American Curl";
pet3.Gender = "Male";
pet3.Disposition = ["No other pets in home", "Good with kids", "Special dietary needs"];
pet3.Age = "5 years";
pet3.DateCreated = "01/01/2021";
pet3.Availability = "Available";
savePet(pet3);

const pet4 = {};
pet4.Name = "Noel";
pet4.Species = "Rabbit";
pet4.Breed = "English Spot Rabbit";
pet4.Gender = "Female";
pet4.Disposition = ["Adults-only home", "Special dietary needs"];
pet4.Age = "8 years";
pet4.DateCreated = "07/01/2021";
pet4.Availability = "Available";
savePet(pet4);

const pet5 = {};
pet5.Name = "Ziva";
pet5.Species = "Dog";
pet5.Breed = "Australian Shepherd";
pet5.Gender = "Female";
pet5.Disposition = ["Good with kids", "Special dietary needs", "High energy"];
pet5.Age = "7 years";
pet5.DateCreated = "06/01/2021";
pet5.Availability = "Available";
savePet(pet5);

const pet6 = {};
pet6.Name = "Dobby";
pet6.Species = "Dog";
pet6.Breed = "Beagle";
pet6.Gender = "Female";
pet6.Disposition = ["Good with kids", "High energy"];
pet6.Age = "4 years";
pet6.DateCreated = "07/01/2020";
pet6.Availability = "Available";
savePet(pet6);

const pet7 = {};
pet7.Name = "Mr. Fluffy";
pet7.Species = "Other";
pet7.Breed = "Angora Rabbit";
pet7.Gender = "Male";
pet7.Disposition = ["Adults-only home", "Special needs"];
pet7.Age = "10 years";
pet7.DateCreated = "08/01/2020";
pet7.Availability = "Available";
savePet(pet7);

const pet8 = {};
pet8.Name = "Whiskers";
pet8.Species = "Cat";
pet8.Breed = "Sphynx";
pet8.Gender = "Female";
pet8.Disposition = ["Good with kids"];
pet8.Age = "6 months";
pet8.DateCreated = "03/01/2021";
pet8.Availability = "Available";
savePet(pet8);

const pet9 = {};
pet9.Name = "Kylie";
pet9.Species = "Dog";
pet9.Breed = "Pomeranian";
pet9.Gender = "Male";
pet9.Disposition = ["Good with kids", "Energetic"];
pet9.Age = "12 years";
pet9.DateCreated = "06/01/2021";
pet9.Availability = "Available";
savePet(pet9);

const pet10 = {};
pet10.Name = "Simba";
pet10.Species = "Cat";
pet10.Breed = "Bengal";
pet10.Gender = "Female";
pet10.Disposition = ["Good with kids"];
pet10.Age = "3 years";
pet10.DateCreated = "05/01/2021";
pet10.Availability = "Available";
savePet(pet10);

const pet11 = {};
pet11.Name = "Tigger";
pet11.Species = "Cat";
pet11.Breed = "Persian";
pet11.Gender = "Female";
pet11.Disposition = ["Good with kids"];
pet11.Age = "8 years";
pet11.DateCreated = "02/01/2021";
pet11.Availability = "Available";
savePet(pet11);

const pet12 = {};
pet12.Name = "Garfield";
pet12.Species = "Cat";
pet12.Breed = "Sphynx";
pet12.Gender = "Female";
pet12.Disposition = ["Good with kids"];
pet12.Age = "2 years";
pet12.DateCreated = "03/01/2021";
pet12.Availability = "Available";
savePet(pet12);

const pet13 = {};
pet13.Name = "Nala";
pet13.Species = "Cat";
pet13.Breed = "Bengal";
pet13.Gender = "Female";
pet13.Disposition = ["Good with kids"];
pet13.Age = "9 years";
pet13.DateCreated = "09/01/2020";
pet13.Availability = "Available";
savePet(pet13);

const pet14 = {};
pet14.Name = "Grumpy Cat";
pet14.Species = "Cat";
pet14.Breed = "Sphynx";
pet14.Gender = "Female";
pet14.Disposition = ["Good with kids"];
pet14.Age = "3 years";
pet14.DateCreated = "10/01/2019";
pet14.Availability = "Not Available";
savePet(pet14);

const pet15 = {};
pet15.Name = "Cheshire";
pet15.Species = "Cat";
pet15.Breed = "Bengal";
pet15.Gender = "Female";
pet15.Disposition = ["Good with kids"];
pet15.Age = "5 years";
pet15.DateCreated = "01/01/2020";
pet15.Availability = "Adopted";
savePet(pet15);

const pet16 = {};
pet16.Name = "Geico";
pet16.Species = "Other";
pet16.Breed = "Cavalier King Charles Spaniel";
pet16.Gender = "Male";
pet16.Disposition = ["Good with kids", "Energetic"];
pet16.Age = "1 year";
pet16.DateCreated = "07/01/2021";
pet16.Availability = "Available";
savePet(pet16);
