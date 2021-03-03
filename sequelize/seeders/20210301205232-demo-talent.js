'use strict';

module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Talents', [
      {
        firebaseId: 'yasbiuycdbucoiuscboiucsiousc!@',
        email: 'galina@cimpric.rs',
        gender: 'FEMALE',
        firstName: 'Galina',
        middleName: '',
        lastName: 'Cimpriç',
        profilePic:
          'https://www.unitex.com/wp-content/uploads/2018/04/Unitex-Nursing-Shortage-1.jpg',
        profession: 'NURSE',
        street: 'Crnotravska',
        streetNo: '27',
        city: 'Belgrad',
        postalCode: '11000',
        isoCode: 'SRB',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis ac turpis vitae commodo. Suspendisse risus ante, pretium sit amet volutpat eu, iaculis vitae dolor. Etiam dictum ex eget magna feugiat, et suscipit justo tincidunt. Vestibulum ac justo sed est venenatis maximus nec non dolor. Aliquam non felis maximus, luctus purus non, sodales elit. Etiam quis cursus turpis, sit amet feugiat est. Donec maximus at erat id fringilla. Integer eget orci quis ex vestibulum vehicula. Phasellus consectetur leo ut orci feugiat posuere sit amet in sapien. Vivamus condimentum pharetra risus, sit amet commodo augue. Donec ultrices risus diam, quis lacinia lacus aliquet eu. Morbi hendrerit, dui ut mollis vulputate, mi ex tristique lectus, ut vulputate nibh dolor eu augue. Phasellus id sapien non nunc posuere tempor malesuada quis sapien. Proin venenatis finibus erat, in vestibulum lacus dignissim quis. Quisque eget venenatis dui. Sed luctus, nisi at dapibus facilisis, turpis metus.',
        experiences: Sequelize.literal(`ARRAY['{
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce arcu odio, mollis consectetur mollis sed, blandit laoreet mi. Aliquam pellentesque maximus ipsum id tincidunt. Donec id mattis dolor. Cras eget nibh dolor. Proin suscipit aliquam turpis nec commodo. Duis mattis accumsan pulvinar. Duis convallis lorem arcu, id condimentum mi fermentum.",
          "duration": {
            "from": {
              "timeStamp": "311549015200"
            },
            "to": {
              "timeStamp": ""
            }
          },
          "employer": "7X5bwUNHDtsayDb-DHn0P",
          "id": "2",
          "lineOfWork": "DOCTOR",
          "talent": "yasbiuycdbucoiuscboiucsiousc!@",
          "title": "Bring your kid to work day"
        }',
        '{
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce arcu odio, mollis consectetur mollis sed, blandit laoreet mi. Aliquam pellentesque maximus ipsum id tincidunt. Donec id mattis dolor. Cras eget nibh dolor. Proin suscipit aliquam turpis nec commodo. Duis mattis accumsan pulvinar. Duis convallis lorem arcu, id condimentum mi fermentum.",
          "duration": {
            "from": {
              "timeStamp": "211546336800"
            },
            "to": {
              "timeStamp": "311549015200"
            }
          },
          "employer": "hLDY65C2dSQcU452wpEKe",
          "id": "1",
          "lineOfWork": "NURSE",
          "talent": "yasbiuycdbucoiuscboiucsiousc!@",
          "title": "Internship"
        }']::"jsonb"[]`),
        qualifications: Sequelize.literal(`ARRAY['{
          "degree": "Certificate of Nursing",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis ac turpis vitae commodo. Suspendisse risus ante, pretium sit amet volutpat eu, iaculis vitae dolor. Etiam dictum ex eget magna feugiat, et suscipit justo tincidunt. Vestibulum ac justo sed est venenatis maximus nec non dolor. Aliquam non felis maximus, luctus purus non, sodales elit. Etiam quis cursus turpis, sit amet feugiat est. Donec maximus at erat id fringilla. Integer eget orci quis ex vestibulum vehicula. Phasellus consectetur leo ut orci feugiat posuere sit amet in sapien. Vivamus condimentum pharetra risus, sit amet commodo augue. Donec ultrices risus diam, quis lacinia lacus aliquet eu. Morbi hendrerit, dui ut mollis vulputate, mi ex tristique lectus, ut vulputate nibh dolor eu augue. Phasellus id sapien non nunc posuere tempor malesuada quis sapien. Proin venenatis finibus erat, in vestibulum lacus dignissim quis. Quisque eget venenatis dui. Sed luctus, nisi at dapibus facilisis, turpis metus.",
          "duration": {
            "from": 1506852000,
            "to": 1533060000
          },
          "fieldOfEducation": "Nursing",
          "id": "1",
          "institution": "isbdiusdbcsd",
          "talent": "yasbiuycdbucoiuscboiucsiousc!@"
        }']::"jsonb"[]`),
        approbations: Sequelize.literal(`ARRAY['{
          "id": "1",
          "state": "RP",
          "status": "ONGOING",
          "talent": "yasbiuycdbucoiuscboiucsiousc!@"
        }']::"jsonb"[]`),
        documents: Sequelize.literal(`ARRAY['{}']::"jsonb"[]`),
        languages: Sequelize.literal(`ARRAY['{
          "id": "1",
          "language": "Serbian",
          "level": "MOTHER_TONGUE",
          "talent": "yasbiuycdbucoiuscboiucsiousc!@"
        }',
        '{
          "id": "2",
          "language": "German",
          "level": "BASIC",
          "talent": "yasbiuycdbucoiuscboiucsiousc!@"
        }']::"jsonb"[]`),
        otherSkills: Sequelize.literal(`ARRAY['{
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis ac turpis vitae commodo. Suspendisse risus ante, pretium sit amet volutpat eu, iaculis vitae dolor. Etiam dictum ex eget magna feugiat, et suscipit justo tincidunt. Vestibulum ac justo sed est venenatis maximus nec non dolor. Aliquam non felis maximus, luctus purus non, sodales elit. Etiam quis cursus turpis, sit amet feugiat est. Donec maximus at erat id fringilla. Integer eget orci quis ex vestibulum vehicula. Phasellus consectetur leo ut orci feugiat posuere sit amet in sapien. Vivamus condimentum pharetra risus, sit amet commodo augue. Donec ultrices risus diam, quis lacinia lacus aliquet eu. Morbi hendrerit, dui ut mollis vulputate, mi ex tristique lectus, ut vulputate nibh dolor eu augue. Phasellus id sapien non nunc posuere tempor malesuada quis sapien. Proin venenatis finibus erat, in vestibulum lacus dignissim quis. Quisque eget venenatis dui. Sed luctus, nisi at dapibus facilisis, turpis metus.",
          "id": "1",
          "level": "MASTER",
          "name": "Old People",
          "talent": "yasbiuycdbucoiuscboiucsiousc!@"
        }']::"jsonb"[]`),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  // eslint-disable-next-line
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Talents', null, {});
  },
};
