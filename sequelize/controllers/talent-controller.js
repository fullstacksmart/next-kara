'use strict';

const db = require('../models');

exports.getAllTalents = async (ctx) => {
  try {
    ctx.body = await db.Talent.findAll();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};

exports.postOne = async (ctx) => {
  const talent = ctx.request.body;
  try {
    await db.Talent.create({
      firebaseId: talent.firebaseId,
      email: talent.email,
      gender: talent.gender,
      firstName: talent.firstName,
      middleName: talent.middleName,
      lastName: talent.lastName,
    });
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};
