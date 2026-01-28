const Table = require("./Table");

exports.createTable = async (data) => {
  const exists = await Table.findOne({ tableNumber: data.tableNumber });
  if (exists) {
    const err = new Error("Table number already exists");
    err.statusCode = 400;
    throw err;
  }

  return Table.create(data);
};

exports.getAllTables = async () => {
  return Table.find({ isActive: true }).sort({ tableNumber: 1 });
};

exports.getTableById = async (id) => {
  const table = await Table.findById(id).populate("currentOrder");

  if (!table) {
    const err = new Error("Table not found");
    err.statusCode = 404;
    throw err;
  }

  return table;
};

exports.updateTable = async (id, data) => {
  const table = await Table.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!table) {
    const err = new Error("Table not found");
    err.statusCode = 404;
    throw err;
  }

  return table;
};

exports.deleteTable = async (id) => {
  const table = await Table.findById(id);

  if (!table) {
    const err = new Error("Table not found");
    err.statusCode = 404;
    throw err;
  }

  // Soft delete
  table.isActive = false;
  await table.save();
};
