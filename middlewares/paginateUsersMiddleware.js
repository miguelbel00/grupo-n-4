module.exports = {
  paginate: async (model, pageSize, pageLimit, search = {}, transform) => {
    try {
      const limit = parseInt(pageLimit, 10) || 10;
      const page = parseInt(pageSize, 10) || 1;

      // take in the model, take in the options

      let { count, rows } = await model.findAndCountAll({
        attributes: ["firstName", "lastname", "email", "createdAt"],

        offset: getOffset(page, limit),
        limit: limit,
        ...search,
      });

      // check if the transform is a function and is not null
      if (transform && typeof transform === "function") {
        rows = transform(rows);
      }

      return {
        previousPage: getPreviousPage(page),
        currentPage: page,
        nextPage: getNextPage(page, limit, count),
        total: count,
        limit: limit,
        data: rows,
      };
    } catch (error) {
      console.log(error);
    }
  },
};

const getOffset = (page, limit) => {
  return page * limit - limit;
};

const getNextPage = (page, limit, total) => {
  if (total / limit > page) {
    return page + 1;
  }

  return null;
};

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return page - 1;
};
