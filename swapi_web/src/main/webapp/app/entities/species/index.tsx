import React from 'react'
import { Route } from 'react-router'

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes'

import Species from './species'
import SpeciesDetail from './species-detail'

const SpeciesRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Species />} />
    <Route path=":id">
      <Route index element={<SpeciesDetail />} />
    </Route>
  </ErrorBoundaryRoutes>
)

export default SpeciesRoutes
