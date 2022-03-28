import { useEffect, useState } from 'react';

import Header from './components/Header';
import Card from './components/Card';
import Form from './components/Form';
import { getAllCampaigns } from "./solana";


const App = () => {
  const [route, setRoute] = useState<number>(0);
  const [cards, setCards] = useState<CardData[]>([]);
  useEffect(() => {
    getAllCampaigns().then((val: CardData[]) => {
      setCards(val);
      console.log(val);
    });
  }, []);
  return (
      <div className="ui container">
        {/* @ts-ignore */}
        <Header setRoute={setRoute} />
        {route === 0 ?
            <div>{
              cards.map((e) => (
                  <Card
                      key={e.pubId?.toString()}
                      data={{
                        title: e.name as string,
                        description: e.description,
                        amount: (e.amount_donated as string).toString(),
                        image: e.image_link as string,
                        id: e.pubId as string,
                      }}
                      setCards={setCards} />
              ))
            }
            </div>
            :
            <Form setRoute={(e) => {
              setRoute(e);
              getAllCampaigns().then((val) => {
                setCards(val);
              });
            }} />
        }
      </div>
  );
}

export default App;