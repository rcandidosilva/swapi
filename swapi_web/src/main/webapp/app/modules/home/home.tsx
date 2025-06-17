import './home.scss'

import React from 'react'
import { Link } from 'react-router-dom'
import { Translate } from 'react-jhipster'
import { Alert, Col, Row, Card } from 'reactstrap'

import { useAppSelector } from 'app/config/store'

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account)

  return (
    <Card className="jh-card">
      <Row>
        <Col md="9">
          <h1 className="display-4">
            <Translate contentKey="home.title">Welcome, SWAPI Sample!</Translate>
          </h1>
          {account?.login ? (
            <div>
              <Alert color="success">
                <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                  You are logged in as user {account.login}.
                </Translate>
              </Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>

                <Link to="/login" className="alert-link">
                  <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
                </Link>
                <Translate contentKey="global.messages.info.authenticated.suffix">
                  , you can try the default accounts:
                  <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                  <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
                </Translate>
              </Alert>

              <Alert color="warning">
                <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
                <Link to="/account/register" className="alert-link">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>
            </div>
          )}

          <p>
            <Translate contentKey="home.like">Please, checkout the source code of this sample at</Translate>{' '}
            <a href="https://github.com/rcandidosilva/swapi" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            !
          </p>
        </Col>      
      </Row>
    </Card>
  )
}

export default Home
