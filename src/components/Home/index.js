import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="heading">Find The Job That Fits Your Life </h1>
          <p className="home-desc">
            Millions of people are searching for jobs,salary,information,company
            reviews Find the Job that fits your abilities and potential.
          </p>
          <Link to="/Jobs">
            <button type="button" className="home-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
