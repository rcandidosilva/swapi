import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Card } from 'reactstrap'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntity } from './species.reducer'

export const SpeciesDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<'id'>()

  useEffect(() => {
    dispatch(getEntity(id))
  }, [])

  const speciesEntity = useAppSelector(state => state.species.entity)
  return (
<Card className="jh-card">
      <Row className='mt-2'>
        <Col md="8">
          <h2 data-cy="speciesDetailsHeading">
            {speciesEntity.name}
          </h2>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md="12">
          <h5 data-cy="speciesDetailsHeading">
            Details
          </h5>
          <hr className="hr" />
        </Col>
      </Row>
      <Row className='mb-5'>
        <Col md="12">
          <table>
            <tr>
              <td>Classification: {speciesEntity.classification}</td> 
            </tr>
            <tr>
              <td>Designation: {speciesEntity.designation}</td> 
            </tr>
            <tr>
              <td>Average Height: {speciesEntity.average_height}</td> 
            </tr>
            <tr>
              <td>Skin Colors: {speciesEntity.skin_colors}</td> 
            </tr>
            <tr>
              <td>Hair Colors: {speciesEntity.hair_colors}</td> 
            </tr>
            <tr>
              <td>Eye Colors: {speciesEntity.eye_colors}</td> 
            </tr>                        
            <tr>
              <td>Average Lifespan: {speciesEntity.average_lifespan}</td> 
            </tr>                        
            <tr>
              <td>Languages: {speciesEntity.languages}</td> 
            </tr>                                                
          </table>
        </Col>
      </Row>      
      <Row className='mt-5'>
        <Col md="12">
          <Button tag={Link} to="/species" replace className="rounded-pill" color="info" data-cy="entityDetailsBackButton">
            <span className="d-none d-md-inline">
              BACK TO SEARCH              
            </span>
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default SpeciesDetail
