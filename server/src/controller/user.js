const { tb_user } = require("../../models");

exports.getUser = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await tb_user.findOne({
      where: {
        id,
      },
    });

    response.send({
      status: "success",
      user: data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
