const { connect } = require("mongoose");

const dbConnection = async () => {
  try {
    await connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar base de datos");
  }
};
module.exports = { dbConnection };
