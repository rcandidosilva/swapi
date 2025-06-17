import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Card } from 'reactstrap'
import { TextFormat, Translate } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { APP_DATE_FORMAT } from 'app/config/constants'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntity } from './vehicle.reducer'

export const VehicleDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<'id'>()

  useEffect(() => {
    dispatch(getEntity(id))
  }, [])

  const vehicleEntity = useAppSelector(state => state.vehicle.entity)
  return (
    <Card className="jh-card">
      <Row className='mt-2'>
        <Col md="8">
          <h2 data-cy="vehicleDetailsHeading">
            {vehicleEntity.name}
          </h2>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md="12">
          <h5 data-cy="vehicleDetailsHeading">
            Details
          </h5>
          <hr className="hr" />
        </Col>
      </Row>
      <Row className='mb-5'>
        <Col md="12">
          <table>
            <tr>
              <td>Model: {vehicleEntity.model}</td> 
            </tr>
            <tr>
              <td>Manufacturer: {vehicleEntity.manufacturer}</td> 
            </tr>
            <tr>
              <td>Cost In Credits: {vehicleEntity.cost_in_credits}</td> 
            </tr>
            <tr>
              <td>Length: {vehicleEntity.length}</td> 
            </tr>
            <tr>
              <td>Max Atmosphering Speed: {vehicleEntity.max_atmosphering_speed}</td> 
            </tr>
            <tr>
              <td>Crew: {vehicleEntity.crew}</td> 
            </tr>                        
            <tr>
              <td>Passangers: {vehicleEntity.passengers}</td> 
            </tr>                        
            <tr>
              <td>Cargo Capacity: {vehicleEntity.cargo_capacity}</td> 
            </tr>                                                
            <tr>
              <td>Consumables: {vehicleEntity.consumables}</td> 
            </tr>                                                
            <tr>
              <td>Vehicle Class: {vehicleEntity.vehicle_class}</td> 
            </tr>                                                
          </table>
        </Col>
      </Row>      
      <Row className='mt-5'>
        <Col md="12">
          <Button tag={Link} to="/vehicle" replace className="rounded-pill" color="info" data-cy="entityDetailsBackButton">
            <span className="d-none d-md-inline">
              BACK TO SEARCH              
            </span>
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default VehicleDetail
