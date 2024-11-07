const f1Api = require('../api/thirdParty.api')

const xml2js = require('xml2js')
const axios = require('axios')

// Function to fetch XML and convert it to JSON
exports.fetchAndConvertXMLtoJSON = async (req, res) => {
  try {
    // Fetch XML data from the URL
    const response = await axios.get('http://ergast.com/api/f1/current/last/results')
    const xmlData = response.data

    // Convert XML to JSON
    const jsonResult = await xml2js.parseStringPromise(xmlData, { mergeAttrs: true, explicitArray: false })
    const final = jsonResult.MRData.RaceTable.Race
    res.json(final)
  } catch (error) {
    console.error('Error fetching or converting XML:', error)
  }
}

exports.getCurrentScoreboard = async (req, res) => {
  try {
     
    const arrResponse = []

    const scoreboard = await f1Api.getCurrentScoreboard()
    
    const currentCompetitors = scoreboard.sports[0].leagues[0].events[4].competitors
    
    for (let i = 0; i < currentCompetitors.length; i++) {
      arrResponse.push(currentCompetitors[i])
    }

    res.json(arrResponse)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch scoreboard', error: error.message })
  }
}

exports.upcomingRacese = async (req, res) => {
  try {
    const filterData = []
    const upcomingRace = await f1Api.upcomingRacese()

    // Get the current date
    const currentDate = new Date()

    // Iterate over each date and its races
    Object.entries(upcomingRace).forEach(([date, races]) => {
      races.forEach((race) => { 
        const raceStartDate = new Date(race.startDate)
        
        // Only include races that are upcoming (start on or after the current date)
        if (raceStartDate >= currentDate) {
          filterData.push({
            date,
            startDate: race.startDate,
            endDate: race.endDate,
            featuredAthletes: race.featuredAthletes,
            status: race.status,
            completed: race.completed,
            grandPrix: race.gPrx,
            circuit: race.crct,
            eventLink: race.evLink,
            isPostponedOrCanceled: race.isPostponedOrCanceled,
            winner: race.winner
          })
        }
      })
    })

    // Send the filtered data as response
    res.json(filterData)

  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch upcoming races', error: error.message })
  }
}

exports.newsReport = async (req, res) => {
  try {
    const newsData = await f1Api.newsReport()
    res.json(newsData)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch News report', error: error.message })
  }
}

