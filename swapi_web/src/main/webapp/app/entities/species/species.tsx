import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Table, Card } from 'reactstrap'
import { TextFormat, Translate, getSortState } from 'react-jhipster'
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntities, getEntitiesByName } from './species.reducer'

export const Species = () => {
  const dispatch = useAppDispatch()

  const pageLocation = useLocation()
  const navigate = useNavigate()

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search))

  const speciesList = useAppSelector(state => state.species.entities)
  const loading = useAppSelector(state => state.species.loading)

  const [inputSearch, setInputSearch] = useState('');

  const handleInputSearch = (event) => {
    setInputSearch(event.target.value);
  };

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

  const getAllEntitiesByName = (name: string) => {
    dispatch(
      getEntitiesByName(name),
    )
  }  

  useEffect(() => {
    sortEntities()
  }, [sortState.order, sortState.sort])

  const handleSearch = () => {
    getAllEntitiesByName(inputSearch)
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
                  <input type="text" value={inputSearch} className="form-control" onChange={handleInputSearch}/>
                </div>
                <div className="d-grid gap-2">
                  <Button className="rounded-pill" color="info" onClick={handleSearch} disabled={loading}>                    
                    SEARCH
                  </Button>
                </div>
              </form>           
            </div>
          </Card>
        </div>
        <div className="col-8">
          <Card className="jh-card">    
            <div>
              <h2 id="species-heading" data-cy="SpeciesHeading">
                Results
              </h2>
              <div className="table-responsive">
                {speciesList && speciesList.length > 0 ? (
                  <Table responsive>
                    <tbody>
                      {speciesList.map((species, i) => (
                        <tr key={`entity-${i}`} data-cy="entityTable">
                          <td>{species.name}</td>
                          <td className="text-end">
                            <div className="btn-group flex-btn-group-container">
                              <Button tag={Link} to={`/species/${species.uid}`} className="rounded-pill" color="info" size="sm" data-cy="entityDetailsButton">
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
                      <Translate contentKey="swapiApiApp.species.home.notFound">No Species found</Translate>
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

export default Species
