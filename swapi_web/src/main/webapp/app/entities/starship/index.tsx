import React from 'react'
import { Route } from 'react-router'

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes'

import Starship from './starship'
import StarshipDetail from './starship-detail'

const StarshipRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Starship />} />
    <Route path=":id">
      <Route index element={<StarshipDetail />} />
    </Route>
  </ErrorBoundaryRoutes>
)

export default StarshipRoutes
