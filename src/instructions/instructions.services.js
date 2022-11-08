const instructionContrellers = require("./instructions.controllers");

const getAllInstructions = (req, res) => {
  instructionContrellers
    .getAllInstructions()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getInstructionById = (req, res) => {
  const id = req.params.instruction_id;
  instructionContrellers
    .getInstructionById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: `Invalid ID : ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const createInstruction = (req, res) => {
  const { step, description, recipeId } = req.body;
  if (step && description && recipeId) {
    instructionContrellers
      .createInstruction({ step, description, recipeId })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "Missing Data",
      fiels: {
        description: "string",
        step: "number",
        recipeId: "uuid",
      },
    });
  }
};

const patchInstruction = (req, res) => {
  const { description, step, recipeId } = req.body;
  const id = req.params.instruction_id;
  instructionControllers
    .updateInstruction(id, { description, step, recipeId })
    .then((data) => {
      if (data[0]) {
        res
          .status(200)
          .json({ message: `Instruction with ID: ${id} edited succesfully` });
      } else {
        res.status(404).json({ message: "Invalid ID", id });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteInstruction = (req, res) => {
  const id = req.params.instruction_id;

  instructionControllers
    .deleteInstruction(id)
    .then((data) => {
      if (data) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: "Invalid ID", id });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getAllInstructions,
  getInstructionById,
  createInstruction,
  patchInstruction,
  deleteInstruction,
};
