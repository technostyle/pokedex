import React from 'react'
import TablePagination from '@material-ui/core/TablePagination'
import { useStore } from 'store'
import { observer } from 'mobx-react-lite'

export const Pagination = observer(() => {
  const store = useStore()

  const handleChangePage = (event, newPage) => {
    store.setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    store.setRowsPerPage(parseInt(event.target.value, 10))
    store.setPage(0)
  }

  return (
    <TablePagination
      nextIconButtonProps={{ disabled: store.nextButtonDisabled }}
      backIconButtonProps={{ disabled: store.backButtonDisabled }}
      component="div"
      count={store.isLoading ? 0 : store.pageCount}
      page={store.isLoading ? 0 : store.page}
      onChangePage={handleChangePage}
      rowsPerPage={store.isLoading ? 0 : store.rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      labelRowsPerPage='cards per page'
      rowsPerPageOptions={store.isLoading ? [] : [10, 20, 50]}
    />
  )
})
