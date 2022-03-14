const { tb_post, tb_user } = require("../../models");

exports.getAllPost = async (request, response) => {
  try {
    let data = await tb_post.findAll({
      include: [
        {
          model: tb_user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        thumbnail: process.env.FILE_PATH + item.thumbnail,
      };
    });

    response.send({
      status: "success",
      data: {
        posts: data,
      },
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "server error",
    });
  }
};

exports.getPost = async (request, response) => {
  let { id } = request.params;
  try {
    let data = await tb_post.findOne({
      where: {
        id,
      },
      include: [
        {
          model: tb_user,
          as: "user",
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));
    data = {
      ...data,
      thumbnail: process.env.FILE_PATH + data.thumbnail,
    };

    response.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addPost = async (request, response) => {
  try {
    // const { id } = request.params;
    let user = request.tb_user.id;
    let findUser = await tb_user.findOne({
      where: {
        id: user,
      },
    });

    findUser = JSON.parse(JSON.stringify(findUser));
    findUser = {
      ...findUser,
    };

    let newPost = await tb_post.create({
      title: request.body.title,
      description: request.body.description,
      thumbnail: request.file.filename,
      idUser: user,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    newPost = JSON.parse(JSON.stringify(newPost));
    newPost = {
      ...newPost,
      ...findUser,
      thumbnail: process.env.FILE_PATH + newPost.thumbnail,
    };

    response.send({
      status: "Success",
      newPost,
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.editPost = async (request, response) => {
  try {
    const { id } = request.params;
    const newData = request.body;
    await tb_post.update(newData, {
      where: {
        id,
      },
    });
    response.send({
      status: "success",
      message: "update post succes",
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "server error",
    });
  }
};

exports.detailPost = async (request, response) => {
  try {
    const { id } = request.params;
    let detail = await tb_post.findOne({
      where: {
        id,
      },
      include: [
        {
          model: tb_user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    detail = JSON.parse(JSON.stringify(detail));
    detail = {
      ...detail,
      thumbnail: process.env.FILE_PATH + detail.thumbnail,
    };
    response.send({
      status: "success",
      message: "success get detail",
      detail,
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "server error",
    });
  }
};

exports.deletePost = async (request, response) => {
  try {
    const { id } = request.params;
    const post = await tb_post.findOne({
      where: {
        id,
      },
    });

    await tb_post.destroy({
      where: {
        id,
      },
    });
    response.send({
      status: "succees",
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "failed",
    });
  }
};

exports.getPostUser = async (request, response) => {
  try {
    const { id } = request.params;
    let data = await tb_post.findAll({
      where: {
        idUser: id,
      },
      include: [
        {
          model: tb_user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));
    data = data.map((item) => {
      return {
        ...item,
        thumbnail: process.env.FILE_PATH + item.thumbnail,
      };
    });

    response.send({
      status: "success",
      data: {
        posts: data,
      },
    });
  } catch (error) {
    response.send({
      status: "server error",
    });
    console.log(error);
  }
};
