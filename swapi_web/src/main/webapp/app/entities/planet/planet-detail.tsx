import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Card } from 'reactstrap'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntity } from './planet.reducer'

export const PlanetDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<'id'>()

  useEffect(() => {
    dispatch(getEntity(id))
  }, [])

  const planetEntity = useAppSelector(state => state.planet.entity)
  return (
    <Card className="jh-card">
      <Row className='mt-2'>
        <Col md="8">
          <h2 data-cy="planetDetailsHeading">
            {planetEntity.name}
          </h2>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md="4">
          <h5 data-cy="filmDetailsHeading">
            Details
          </h5>
          <hr className="hr" />
        </Col>
      </Row>
      <Row className='mb-5'>
        <Col md="6">
          <table>
            <tr>
              <td>Rotation Period: {planetEntity.rotation_period}</td> 
            </tr>
            <tr>
              <td>Orbital Period: {planetEntity.orbital_period}</td> 
            </tr>
            <tr>
              <td>Diameter: {planetEntity.diameter}</td> 
            </tr>
            <tr>
              <td>Climate: {planetEntity.climate}</td> 
            </tr>
            <tr>
              <td>Gravity: {planetEntity.gravity}</td> 
            </tr>
            <tr>
              <td>Terrain: {planetEntity.terrain}</td> 
            </tr>                        
            <tr>
              <td>Surface Water: {planetEntity.surface_water}</td> 
            </tr>                        
            <tr>
              <td>Population: {planetEntity.population}</td> 
            </tr>                                                
          </table>
        </Col>
        <Col md="6">
        </Col>
      </Row>      
      <Row className='mt-5'>
        <Col md="12">
          <Button tag={Link} to="/planet" replace className="rounded-pill" color="info" data-cy="entityDetailsBackButton">
            <span className="d-none d-md-inline">
              BACK TO SEARCH              
            </span>
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default PlanetDetail
