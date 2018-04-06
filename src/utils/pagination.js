const paginationParse = (total, page, limit) => {
  const pages = Math.ceil(total / limit)
  const next_page = page < pages ? page + 1 : null
  const preview_page = page > 1 ? page - 1 : null

  return {
    total_items: total,
    current_page: page,
    next_page,
    preview_page,
    pages,
    per_page: limit,
  }
}

export default paginationParse
