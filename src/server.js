import app from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => logger.success(`🚀 Server running on port ${PORT}`));
