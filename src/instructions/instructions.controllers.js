const Instructions = require("../models/instructions.models");
const uuid = require("uuid");

const getAllInstructions = async () => {
  const data = await Instructions.findAll();
  return data;
};

const getInstructionById = async (id) => {
  const data = await Instructions.findOne({
    where: {
      id,
    },
  });
  return data;
};

const createInstruction = async (data) => {
  const response = await Instructions.create({
    id: uuid.v4(),
    recipeId: data.recipeId,
    step: data.step,
    description: data.description,
  });
  return response;
};

const updateInstruction = async (id) => {
  const data = await Instructions.update({
    where: {
      id,
    },
  });
  return data;
};

const deleteInstruction = async (id) => {
  const data = await Instructions.destroy({
    where: {
      id,
    },
  });
  return data;
};

module.exports = {
  getAllInstructions,
  getInstructionById,
  createInstruction,
  updateInstruction,
  deleteInstruction,
};
