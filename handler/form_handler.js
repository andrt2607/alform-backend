const { default: mongoose } = require("mongoose");
const form = require("../models/form");

const createNewForm = async (req, res) => {
  try {
    const newForm = await form.create({
      userId: req.jwt.id,
      title: "Untitled Form",
      description: null,
      public: true,
    });
    if (!newForm) {
      throw { code: 500, message: "FAILED_CREATE_FORM" };
    }

    return res.status(200).json({
      status: true,
      message: "SUCCESS_CREATE_FORM",
      newForm,
    });
  } catch (error) {
    return res.status(error.code || 500).json({
      status: false,
      message: error.message,
    });
  }
};

const showFormById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw { code: 400, message: "INVALID_FORM_ID" };
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw { code: 400, message: "INVALID_ID" };
    }
    const targetForm = await form.findOne({ _id: req.params.id, userId: req.jwt.id});
    if (!form) {
      throw { code: 404, message: "FORM_NOT_FOUND" };
    }
    return res.status(200).json({
      status: true,
      message: "SUCCESS_GET_FORM",
      targetForm,
    });
  } catch (error) {
    return res.status(error.code || 500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateForm = async (req, res) => {
    try {
        if (!req.params.id) {
          throw { code: 400, message: "INVALID_FORM_ID" };
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          throw { code: 400, message: "INVALID_ID" };
        }
        //{new: true} untuk return data terbaru form yg updated
        const targetForm = await form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id}, req.body, { new: true});
        if (!form) {
          throw { code: 404, message: "FORM_NOT_FOUND" };
        }
        return res.status(200).json({
          status: true,
          message: "SUCCESS_UPDATE_FORM",
          targetForm,
        });
      } catch (error) {
        return res.status(error.code || 500).json({
          status: false,
          message: error.message,
        });
      }
}

const deleteForm = async (req, res) => {
  try {
    if (!req.params.id) {
      throw { code: 400, message: "INVALID_FORM_ID" };
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw { code: 400, message: "INVALID_ID" };
    }
    //{new: true} untuk return data terbaru form yg updated
    const targetForm = await form.deleteOne({ _id: req.params.id, userId: req.jwt.id});
    if (!form) {
      throw { code: 404, message: "FORM_NOT_FOUND" };
    }
    return res.status(200).json({
      status: true,
      message: "SUCCESS_DELETE_FORM",
      targetForm,
    });
  } catch (error) {
    return res.status(error.code || 500).json({
      status: false,
      message: error.message,
    });
  }
}

const index = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1
    const targetForm = await form.paginate({ userId: req.jwt.id}, {limit: limit, page: page});
    if (!form) {
      throw { code: 404, message: "FORMS_NOT_FOUND" };
    }
    return res.status(200).json({
      status: true,
      message: "SUCCESS_GET_FORM",
      targetForm,
    });
  } catch (error) {
    return res.status(error.code || 500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { createNewForm, showFormById, updateForm, deleteForm, index };
