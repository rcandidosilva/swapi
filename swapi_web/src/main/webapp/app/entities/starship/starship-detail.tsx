import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Card } from 'reactstrap'
import { TextFormat, Translate } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { APP_DATE_FORMAT } from 'app/config/constants'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntity } from './starship.reducer'

export const StarshipDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<'id'>()

  useEffect(() => {
    dispatch(getEntity(id))
  }, [])

  const starshipEntity = useAppSelector(state => state.starship.entity)
  return (
    <Card className="jh-card">
      <Row className='mt-2'>
        <Col md="8">
          <h2 data-cy="starshipDetailsHeading">
            {starshipEntity.name}
          </h2>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md="12">
          <h5 data-cy="starshipDetailsHeading">
            Details
          </h5>
          <hr className="hr" />
        </Col>
      </Row>
      <Row className='mb-5'>
        <Col md="12">
          <table>
            <tr>
              <td>Model: {starshipEntity.model}</td> 
            </tr>
            <tr>
              <td>Manufacturer: {starshipEntity.manufacturer}</td> 
            </tr>
            <tr>
              <td>Cost In Credits: {starshipEntity.cost_in_credits}</td> 
            </tr>
            <tr>
              <td>Length: {starshipEntity.length}</td> 
            </tr>
            <tr>
              <td>Max Atmosphering Speed: {starshipEntity.max_atmosphering_speed}</td> 
            </tr>
            <tr>
              <td>Crew: {starshipEntity.crew}</td> 
            </tr>                        
            <tr>
              <td>Passangers: {starshipEntity.passengers}</td> 
            </tr>                        
            <tr>
              <td>Cargo Capacity: {starshipEntity.cargo_capacity}</td> 
            </tr>                                                
            <tr>
              <td>Consumables: {starshipEntity.consumables}</td> 
            </tr>                                                
            <tr>
              <td>Starship Class: {starshipEntity.startship_class}</td> 
            </tr>            
            <tr>
              <td>Hyperdrive Rating: {starshipEntity.hyperdrive_rating}</td> 
            </tr>            
            <tr>
              <td>Mglt: {starshipEntity.mglt}</td> 
            </tr>                                                
          </table>
        </Col>
      </Row>      
      <Row className='mt-5'>
        <Col md="12">
          <Button tag={Link} to="/starship" replace className="rounded-pill" color="info" data-cy="entityDetailsBackButton">
            <span className="d-none d-md-inline">
              BACK TO SEARCH              
            </span>
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default StarshipDetail
