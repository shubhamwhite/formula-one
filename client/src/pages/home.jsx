import NavBar from '../components/NavBar'
import Slider from '../components/Slider'
import CombineCard from '../components/thirdPatyCard/CombineCard'
import BettingShow from '../components/userBetting/BettingShow'

const Home = () => {
  return (
    <div>
       <NavBar/>
       <Slider/>
       <CombineCard/>
       <BettingShow/>
    </div>
  )
}

export default Home