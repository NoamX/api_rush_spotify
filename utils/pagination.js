const pagination = async (page, Model, url, step, options = {}) => {
  let currentPage = Number(page) || 1;
  let nextPage = currentPage + 1;

  const count = await Model.count({ ...options });
  if (currentPage * step > count) {
    nextPage = null;
  }

  let currentPageUrl = `${url}?page=${currentPage}`;

  let nextPageUrl = null;
  if (nextPage != null) {
    nextPageUrl = `${url}?page=${nextPage}`;
  }

  let start = 0;
  if (currentPage > 1) {
    start = step * (currentPage - 1);
  }

  const result = await Model.findAll({
    limit: [start, step],
    ...options,
  });

  return {
    currentPageUrl,
    nextPageUrl,
    count,
    result,
  };
};

module.exports = pagination;
