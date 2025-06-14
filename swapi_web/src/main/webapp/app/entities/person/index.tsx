import React from 'react'
import { Route } from 'react-router'

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes'

import Person from './person'
import PersonDetail from './person-detail'

const PersonRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Person />} />
    <Route path=":id">
      <Route index element={<PersonDetail />} />
    </Route>
  </ErrorBoundaryRoutes>
)

export default PersonRoutes
