const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  async index(req, res) {
    const jobs = await Job.get()
    const profile = await Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }
    
    let jobTotalHours = 0

    const updateJobs = jobs.map((job) => {
      const remaining = JobUtils.remainindDays(job)
      const status = remaining <= 0 ? "done" : "progress"
      statusCount[status] += 1

      if(status === "progress") {
        jobTotalHours += Number(job["daily-hours"])
      }
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    })
    const freeHours = profile["hours-per-day"] - jobTotalHours
    return res.render("index", { jobs: updateJobs, profile, statusCount, freeHours })
  }
}
