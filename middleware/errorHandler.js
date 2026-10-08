export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: "Маршрут не найден" });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: "Ошибка валидации", details: Object.values(err.errors).map(e => e.message) });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Некорректный ID" });
  }
  if (err.code === 11000) {
    return res.status(400).json({ error: "Такой пользователь или email уже существует" });
  }
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
};