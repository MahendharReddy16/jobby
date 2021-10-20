import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'
import ProfileSection from '../profile'
import FilterGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import SearchSection from '../SearchSection'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusContants.initial,
    searchInput: '',
    employmentTypeParameter: '',
    salaryRangeParameter: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusContants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {
      searchInput,
      employmentTypeParameter,
      salaryRangeParameter,
    } = this.state

    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeParameter}&minimum_package=${salaryRangeParameter}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(jobApiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusContants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusContants.failure,
      })
    }
  }

  changeSalaryRange = salaryRangeParameter => {
    this.setState({salaryRangeParameter}, this.getJobDetails)
  }

  changeEmployment = employmentTypeParameter => {
    this.setState({employmentTypeParameter}, this.getJobDetails)
  }

  enterSearchInput = () => {
    this.getJobDetails()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  retryJobsCall = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.retryJobsCall()}
      >
        Retry
      </button>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-jobs-container">
        <ul className="jobs-list">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-text">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllSections = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContants.success:
        return this.renderJobsListView()
      case apiStatusContants.failure:
        return this.renderFailureView()
      case apiStatusContants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="profile-filter-container">
          <div className="search-small-section">
            <SearchSection
              enterSearchInput={this.enterSearchInput}
              changeSearchInput={this.changeSearchInput}
            />
          </div>
          <ProfileSection />
          <FilterGroup
            salaryList={salaryRangesList}
            employmentOptions={employmentTypesList}
            changeSalaryRange={this.changeSalaryRange}
            changeEmployment={this.changeEmployment}
          />
        </div>
        <div className="search-jobs-container">
          <div className="search-large-device">
            <SearchSection
              enterSearchInput={this.enterSearchInput}
              changeSearchInput={this.changeSearchInput}
            />
          </div>
          {this.renderAllSections()}
        </div>
      </>
    )
  }
}

export default AllJobsSection
