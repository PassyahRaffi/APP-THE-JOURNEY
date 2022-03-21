const { tb_user } = require("../../models");

const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const uploadServer = "http://localhost:5000/uploads/";

exports.register = async (request, response) => {
  // Joi scheme
  const scheme = joi.object({
    name: joi.string().min(4).required(),
    phone: joi.number().min(6).required(),
    email: joi.string().min(6).required(),
    password: joi.string().min(4).required(),
  });

  const { error } = scheme.validate(request.body);
  if (error) {
    return response.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const existUser = await tb_user.findOne({
      where: {
        email: request.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (existUser) {
      return response.status(400).send({
        status: "failed",
        message: "Email Already Registered!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const newUser = await tb_user.create({
      name: request.body.name,
      phone: request.body.phone,
      email: request.body.email,
      password: hashedPassword,
      image: "default-user.png", // new
    });

    const token = jwt.sign(
      {
        id: tb_user.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone, /* new */
        password: newUser.password,
        image: newUser.image, /* new */
      },
      process.env.JWT_KEY
    );

    response.status(200).send({
      status: "success",
      message: "Register Success!",
      data: {
        name: newUser.name, /* new */
        email: newUser.email, /* new */
        phone: newUser.phone, /* new */
        image: newUser.image, /* new */
        token, /* new */
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};

exports.login = async (request, response) => {
  const scheme = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi.string().min(4).required(),
  });

  const { error } = scheme.validate(request.body);
  if (error) {
    return response.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const existUser = await tb_user.findOne({
      where: {
        email: request.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!existUser) {
      return response.status(400).send({
        status: "failed",
        message: "Email Is Not Registered!",
      });
    }

    const isValid = await bcrypt.compare(
      request.body.password,
      existUser.password
    );
    if (!isValid) {
      return response.status(400).send({
        status: "failed",
        message: "Password Incorrect!",
      });
    }

    const token = jwt.sign({ id: existUser.id }, process.env.JWT_KEY);
    const user = {
      id: existUser.id,
      name: existUser.name,
      email: existUser.email,
      phone: existUser.phone,
      image: uploadServer + existUser.image, /* new pending */
      token,
    };

    response.status(200).send({
      status: "succes",
      message: "Login Success!",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: "failed",
      message: "Server Error!",
    });
  }
};

exports.checkAuth = async (request, response) => {
  try {
    const id = request.tb_user.id;

    const dataUser = await tb_user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return response.status(404).send({
        status: "failed",
        message: "User not Found", /* new */
      });
    }

    response.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          phone: dataUser.phone,
          image: uploadServer + dataUser.image, /* new pending */
        },
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).status({
      status: "failed",
      message: "Server Error!",
    });
  }
};
