const converter = require("./converter");


const getTeaching = {
  get: async (connection) => {

    const teachings = await connection.Teachings.findAll();

    return {
      "success": true,
      "result": {
        teachings: teachings
      }
    };
  }
};

const addTeaching = {
  put: async (connection, req) => {
    let text = await converter.teaching.post.text(req.body);
    let images = await converter.teaching.post.images(req.files);
    let links = await converter.teaching.post.links(req.body);

    await connection.Teachings.create({
      title: req.body.title,
      lesson: req.body.lesson,
      description: { text, images, links }
    });

    return {
      "success": true,
      "result": {
        "message": "Teaching successfully created"
      }
    };
  }
};

const deleteTeaching = {
  delete: async (connection, options) => {

    await connection.Teachings.destroy({ where: { id: options.teachingId } });

    return {
      "success": true,
      "result": {
        result: "Teaching was successfully deleted"
      }
    };
  }
};

module.exports = {
  getTeaching,
  addTeaching,
  deleteTeaching
};
