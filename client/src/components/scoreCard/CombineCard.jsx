import ScroreCard from './CurrentScroreCard';
import UpCommingMatch from './UpCommingMatch';
import NewsCard from './NewsCard';
const CombineCard = () => {
  return (
    <>
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex-[1_1_30%] md:max-w-[30%]">
        <ScroreCard />
      </div>
      <div className="flex-[1_1_70%] md:max-w-[70%]">
        <UpCommingMatch />
      </div>
    </div>
      <NewsCard/>
    </>

  );
};

export default CombineCard;
