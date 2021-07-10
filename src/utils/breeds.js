const { species } = require("./species");

const breeds = {
  [species.DOG]: {
    AUSTRALIAN_SHEPHERD: "Australian Shepherd",
    BEAGLE: "Beagle",
    BORDER_COLLIE: "Border Collie",
    BULLDOG: "Bulldog",
    CAVALIER_KING_CHARLES_SPANIEL: "Cavalier King Charles Spaniel",
    CORGI: "Corgi",
    FRENCH_BULLDOG: "French Bulldog",
    GERMAN_SHEPHERD: "German Shepherd",
    GOLDEN_RETREIVER: "Golden Retreiver",
    POODLE: "Poodle",
    POMERANIAN: "Pomeranian",
    PUG: "Pug",
    SIBERIAN_HUSKY: "Siberian Husky",
    YORKSHIRE_TERRIER: "Yorkshire Terrier",
    OTHER: "Other",
  },
  [species.CAT]: {
    AMERICAN_CURL: "American Curl",
    BENGAL: "Bengal",
    BRITISH_SHORTHAIR: "British Shorthair",
    MAIN_COON: "Main Coon",
    MUNCH: "Munch",
    PERSIAN: "Persian",
    RAGDOLL: "Ragdoll",
    SIAMESE: "Siamese",
    SPHYNX: "Sphynx",
    OTHER: "Other",
  },
  [species.RABBIT]: {
    ANGORA_RABBIT: "Angora Rabbit",
    ENGLISH_SPOT_RABBIT: "English Spot Rabbit",
    OTHER: "Other",
  },
  [species.GECKO]: {
    COMMON_LEOPARD_GECKO: "Common Leopard Gecko",
    OTHER: "Other",
  },
};

module.exports.breeds = breeds;
