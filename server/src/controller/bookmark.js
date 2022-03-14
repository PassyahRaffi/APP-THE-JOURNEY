const { tb_bookmark, tb_post, tb_user } = require("../../models");

exports.addBookmark = async (request, response) => {
  try {
    const addBookmark = await tb_bookmark.create({
      idUser: request.tb_user.id,
      idPost: request.body.idJourney,
    });

    response.send({
      status: "success",
      message: {
        addBookmark,
      },
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "server error",
    });
  }
};

exports.deleteBookmark = async (request, response) => {
  try {
    await tb_bookmark.destroy({
      where: {
        id: request.body.id,
      },
    });

    response.send({
      status: "success",
      message: "delete bookmark success",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBookmarkuser = async (request, response) => {
  try {
    const { id } = request.params;

    let bookmarkData = await tb_bookmark.findAll({
      where: {
        idUser: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: tb_post,
          as: "bookmark",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: tb_user,
              as: "user",
            },
          ],
        },
      ],
    });

    response.send({
      status: "success",
      bookmarkData,
    });
  } catch (error) {
    console.log(error);
    response.send({
      message: "server error",
    });
  }
};
