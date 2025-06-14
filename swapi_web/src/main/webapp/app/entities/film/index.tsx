import React from 'react'
import { Route } from 'react-router'

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes'

import Film from './film'
import FilmDetail from './film-detail'

const FilmRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Film />} />
    <Route path=":id">
      <Route index element={<FilmDetail />} />
    </Route>
  </ErrorBoundaryRoutes>
)

export default FilmRoutes
