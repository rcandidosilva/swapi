import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Table, Card } from 'reactstrap'
import { TextFormat, Translate, getSortState } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { APP_DATE_FORMAT } from 'app/config/constants'
import { ASC, DESC } from 'app/shared/util/pagination.constants'
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntities } from './vehicle.reducer'

export const Vehicle = () => {
  const dispatch = useAppDispatch()

  const pageLocation = useLocation()
  const navigate = useNavigate()

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search))

  const vehicleList = useAppSelector(state => state.vehicle.entities)
  const loading = useAppSelector(state => state.vehicle.loading)

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    )
  }

  const sortEntities = () => {
    getAllEntities()
    const endURL = `?sort=${sortState.sort},${sortState.order}`
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`)
    }
  }

  useEffect(() => {
    sortEntities()
  }, [sortState.order, sortState.sort])

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    })
  }

  const handleSyncList = () => {
    sortEntities()
  }

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort
    const order = sortState.order
    if (sortFieldName !== fieldName) {
      return faSort
    }
    return order === ASC ? faSortUp : faSortDown
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <Card className="jh-card">
            <div>              
              <p>What are you searching for?</p>              
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control"/>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-info rounded-pill" type="button">SEARCH</button>
                </div>

              </form>            
            </div>
          </Card>
        </div>
        <div className="col-8">
          <Card className="jh-card">
            <div>
              <h2 id="vehicle-heading" data-cy="VehicleHeading">
                Results
              </h2>
              <div className="table-responsive">
                {vehicleList && vehicleList.length > 0 ? (
                  <Table responsive>
                    <tbody>
                      {vehicleList.map((vehicle, i) => (
                        <tr key={`entity-${i}`} data-cy="entityTable">
                          <td>{vehicle.name}</td>
                          <td className="text-end">
                            <div className="btn-group flex-btn-group-container">
                              <Button tag={Link} to={`/vehicle/${vehicle.uid}`} className="rounded-pill" color="info" size="sm" data-cy="entityDetailsButton">
                                <span className="d-none d-md-inline">
                                  SEE DETAILS
                                </span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !loading && (
                    <div className="alert alert-warning">
                      <Translate contentKey="swapiApiApp.vehicle.home.notFound">No Vehicles found</Translate>
                    </div>
                  )
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Vehicle
