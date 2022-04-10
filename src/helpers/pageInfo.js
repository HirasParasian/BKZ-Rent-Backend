/* eslint-disable no-console */
const { APP_URL } = process.env;

exports.pageInfo = (total, limit, page, url, route) => {
  const last = Math.ceil(total / limit);
  const pageInfo = {
    prev: page > 1 ? `${APP_URL}/${route}?page=${page - 1}&${url}` : null,
    next: page < last ? `${APP_URL}/${route}?page=${page + 1}&${url}` : null,
    totalData: total,
    currentPage: page,
    lastPage: last,
  };
  return pageInfo;
};
