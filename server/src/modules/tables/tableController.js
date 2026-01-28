const wrapAsync = require("../../shared/utils/wrapAsync");
const tableService = require("./tableService");

exports.createTable = wrapAsync(async (req, res) => {
  const table = await tableService.createTable(req.body);
  res.status(201).json(table);
});

exports.getTables = wrapAsync(async (req, res) => {
  const tables = await tableService.getAllTables();
  res.json(tables);
});

exports.getTable = wrapAsync(async (req, res) => {
  const table = await tableService.getTableById(req.params.id);
  res.json(table);
});

exports.updateTable = wrapAsync(async (req, res) => {
  const table = await tableService.updateTable(req.params.id, req.body);
  res.json(table);
});

exports.deleteTable = wrapAsync(async (req, res) => {
  await tableService.deleteTable(req.params.id);
  res.status(204).end();
});
