const pageInfo = (data, total, page, table) => {
  const last = Math.ceil(total / data.limit)
  return {
    prev: page > last ? `http://localhost:5000/${table}?page=${page - 1}` : null,
    next: page < last ? `http://localhost:5000/${table}?page=${page + 1}` : null,
    totalData: total,
    currentPage: page,
    lastPage: last
  }
}

module.exports = { pageInfo }