import React from 'react'
import { Route } from 'react-router'

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes'

import Planet from './planet'
import PlanetDetail from './planet-detail'

const PlanetRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Planet />} />
    <Route path=":id">
      <Route index element={<PlanetDetail />} />
    </Route>
  </ErrorBoundaryRoutes>
)

export default PlanetRoutes
